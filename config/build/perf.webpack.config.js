const { merge } = require('webpack-merge');
const common = require('./pro.webpack.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	plugins: [new BundleAnalyzerPlugin()],
});
