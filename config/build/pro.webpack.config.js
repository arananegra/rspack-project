const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./base.webpack.config');
const helpers = require('./helpers');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'cheap-source-map',
	output: {
		path: helpers.resolveFromRootPath('dist-pro'),
		filename: '[name].[chunkhash].js',
		assetModuleFilename: '[hash][ext][query]',
		publicPath: '/3.0/',
	},

	performance: {
		hints: false,
	},
	optimization: {
		moduleIds: 'deterministic',
		usedExports: true,
		minimize: true,
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial',
					enforce: true,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		}
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[name]_[local]_[hash]',
								exportLocalsConvention: 'camelCase',
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css',
			chunkFilename: 'chunk.[name].css',
		})
	],
});
