'use strict';

const makeWebpackConfig = require('./webpack.make');

/**
 * Webpack config for tests
 */
const buildConfig = {
	BUILD: false,
	TEST: true
};

module.exports = makeWebpackConfig(buildConfig);