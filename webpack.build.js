'use strict';

const makeWebpackConfig = require('./webpack.make');

/**
 * Webpack config for builds
 */
const buildConfig = {
	BUILD: true,
	TEST: false
};

module.exports = makeWebpackConfig(buildConfig);