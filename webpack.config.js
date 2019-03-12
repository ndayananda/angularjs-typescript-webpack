'use strict';

const makeWebpackConfig = require('./webpack.make');

/**
 * Webpack config for development
 */
const buildConfig = {
	BUILD: false,
	TEST: false
};

module.exports = makeWebpackConfig(buildConfig);