// Modules
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { WebpackWarPlugin } = require('webpack-war-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const ManifestPlugin = require('webpack-manifest-plugin');

const makeWebpackConfig = (options) => {
	/**
	 * Environment type
	 * BUILD is for generating minified builds
	 * TEST is for generating test builds
	 */
	var BUILD = !!options.BUILD;
	var TEST = !!options.TEST;

	const PORT = 9000;

	// Use the below variable to make rest API call to different server from your localhost
	const restAPI = false; // First set restAPI flag to true

	/**
	 * Config
	 * Reference: http://webpack.github.io/docs/configuration.html
	 * This is the object where all configuration gets set
	 */
	var config = {};

	/**
	 * Entry
	 * Reference: http://webpack.github.io/docs/configuration.html#entry
	 * Should be an empty object if it's generating a test build
	 * Karma will set this when it's a test build
	 */
	if (TEST) {
		config.entry = {}
	} else {
		config.entry = {
			'babel-polyfill': ['babel-polyfill'],
			app: './src/app/app.ts'
		}
	}

	/**
	 * Output
	 * Reference: http://webpack.github.io/docs/configuration.html#output
	 * Should be an empty object if it's generating a test build
	 * Karma will handle setting it up for you when it's a test build
	 */
	if (TEST) {
		config.output = {}
	} else {
		config.output = {
			// Absolute output directory
			path: path.resolve(__dirname, 'dist'),

			// Output path from the view of the page
			// Uses webpack-dev-server in development
			publicPath: BUILD ? '/winds/' : '/',

			// Filename for entry points
			// Only adds hash in build mode
			filename: BUILD ? '[name].[chunkhash].js' : '[name].bundle.js',

			// Filename for non-entry points
			// Only adds hash in build mode
			chunkFilename: BUILD ? '[name].[chunkhash].js' : '[name].bundle.js'
		}
	}

	/**
	 * Devtool
	 * Reference: http://webpack.github.io/docs/configuration.html#devtool
	 * Type of sourcemap to use per build type
	 */
	if (TEST) {
		config.devtool = 'cheap-module-eval-source-map';
	} else if (BUILD) {
		config.devtool = 'cheap-module-source-map';
	} else {
		config.devtool = 'eval';
	}

	config.resolve = {
		extensions: ['.ts', '.js']
	};

	/**
	 * Loaders
	 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
	 * List: http://webpack.github.io/docs/list-of-loaders.html
	 * This handles most of the magic responsible for converting modules
	 */

	// Initialize module
	config.module = {
		rules: [{
			// JS LOADER
			// Reference: https://github.com/babel/babel-loader
			// Transpile .js files using babel-loader
			// Compiles ES6 and ES7 into ES5 code
			test: /\.ts$/,
			include: path.resolve(__dirname, "src/app"),
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: 'cache-loader'
			}, {
				loader: 'babel-loader',
				options: {
					presets: ['env'],
					plugins: ['angularjs-annotate']
				}
			}, {
				loader: 'ts-loader',
				options: {
					// disable type checker - we will use it in fork plugin
					transpileOnly: true
				}
			}]
		}, {
			// SASS/CSS/Style LOADER
			// Reference: https://github.com/webpack/extract-text-webpack-plugin
			// Extract css files in production builds
			//
			// Reference: https://github.com/webpack/style-loader
			// Use style-loader in development for hot-loading
			//
			// Reference: https://github.com/postcss/postcss-loader
			// PostCSS is a tool for transforming styles with JS plugins.
			// The Autoprefixer PostCSS plugin is one of the most popular CSS processors.
			test: /\.(s?)css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				//resolve-url-loader may be chained before sass-loader if necessary
				use: ['cache-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			})
		}, {
			// ASSET LOADER
			// Reference: https://github.com/webpack/file-loader
			// Copy png, jpg, jpeg, gif files to output
			// Rename the file using the asset hash
			// Pass along the updated reference to your code
			// You can add here any file extension you want to get copied to your output
			test: /.(png|jpg|jpeg|gif|svg?)(\?[a-z0-9]+)?$/,
			use: [{
				loader: 'cache-loader'
			}, {
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]'
				}
			}]
		}, {
			test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				}
			}]
		}, {
			test: /\.html$/,
			exclude: `${path.join(__dirname, "src/index.html")}`,
			use: [{
				loader: 'cache-loader'
			}, {
				loader: 'ngtemplate-loader',
				options: {
					resolveTo: path.join(__dirname, "src/app/")
				}
			}, {
				loader: 'html-loader'
			}]
		}]
	};

	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 * List: http://webpack.github.io/docs/list-of-plugins.html
	 */
	config.plugins = [
		// Reference: https://github.com/webpack/extract-text-webpack-plugin
		// Extract css files
		// Disabled when in test mode or not in build mode
		new ExtractTextPlugin({
			filename: BUILD ? '[name].[chunkhash].css' : '[name].bundle.css',
			disable: false,
			allChunks: true
		}),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': (BUILD) ? '"production"' : '"development"'
		})
	];

	// Skip rendering index.html in test mode
	if (!TEST) {
		config.plugins.push(
			// Reference: https://github.com/ampedandwired/html-webpack-plugin
			// Render index.html
			new HtmlWebpackPlugin({
				template: './src/index.html',
				chunks: ['manifest', 'vendor', 'babel-polyfill', 'app'],
				exclude: [],
				chunksSortMode: 'manual',
				inject: false,
				minify: {
					useShortDoctype: true,
					removeAttributeQuotes: true
				}
			}),

			new webpack.HashedModuleIdsPlugin(),

			new ForkTsCheckerWebpackPlugin(),

			// Automatically move all modules defined outside of application directory to vendor bundle.
			// If you are using more complicated project structure, consider to specify common chunks manually.
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				chunks: ['common'],
				minChunks: (module) => module.context && module.context.includes("node_modules")
			}),

			new webpack.optimize.CommonsChunkPlugin({
				name: 'manifest',
				minChunks: Infinity
			})
		);
	}

	// Add build specific plugins
	if (BUILD) {
		config.plugins.push(
			// Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			// Minify all javascript, switch loaders to minimizing mode
			new webpack.optimize.UglifyJsPlugin({
				cache: true,
				uglifyOptions: {
					mangle: false,
					compress: {
						sequences: true,
						dead_code: true,
						conditionals: true,
						booleans: true,
						unused: true,
						if_return: true,
						join_vars: true,
						drop_console: true
					}
				},
				exclude: [/\.min\.js$/gi] // skip pre-minified libs
			}),

			new WebpackWarPlugin({
				archiveName: 'app'
			}),

			// new BundleAnalyzerPlugin({
			// 	analyzerHost: 'localhost',
			// })

			/**
			 * Auto inject version
			 * Reference: https://github.com/radswiat/webpack-auto-inject-version
			 * Adds version from package.json into every single file as top comment block.
			 */
			new WebpackAutoInject({
				PACKAGE_JSON_PATH: './package.json',
				components: {
					AutoIncreaseVersion: true,
					InjectByTag: true
				},
				componentsOptions: {
					AutoIncreaseVersion: {
						runInWatchMode: false // it will increase version with every single build!
					}
				}
			})
		)
	}

	/**
	 * Dev server configuration
	 * Reference: http://webpack.github.io/docs/configuration.html#devserver
	 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
	 */
	config.devServer = {
		contentBase: path.join(__dirname, '/dist'),
		compress: true,
		historyApiFallback: true,
		open: true,
		port: PORT,
		proxy: (restAPI) ? {
			'/service': {
				target: apiHost,
				secure: false,
				changeOrigin: true
			}
		} : {},
		stats: {
			modules: false,
			cached: false,
			colors: true,
			chunk: false
		}
	};

	return config;
};

module.exports = makeWebpackConfig;