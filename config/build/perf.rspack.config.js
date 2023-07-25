const { merge } = require('webpack-merge');
const common = require('./pro.rspack.config');
const { defineConfig } = require('@rspack/cli');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = defineConfig(
	merge(common, {
		plugins: [new BundleAnalyzerPlugin()],
	}),
);
module.exports = config;
