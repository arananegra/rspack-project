const { merge } = require('webpack-merge');
const common = require('./base.rspack.config');
const helpers = require('./helpers');
const { defineConfig } = require('@rspack/cli');

const config = defineConfig(
	merge(common, {
		mode: 'production',
		devtool: 'cheap-source-map',
		output: {
			path: helpers.resolveFromRootPath('dist'),
			filename: '[name].[chunkhash].js',
			assetModuleFilename: '[hash][ext][query]'
		},
		builtins: {
			css: {
				modules: {
					localIdentName: '[name]_[local]_[hash]',
					localsConvention: 'camelCase',
				},
			},
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
				minChunks: 1,
				cacheGroups: {
					defaultVendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						name: 'vendor',
					},
					default: {
						minChunks: 2,
						priority: -20,
					},
				},
			},
		},

		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'),
							},
						},
					],
					type: 'css/module',
				},
				{
					test: /\.css$/,
					type: 'css',
				},
			],
		}
	})
);
module.exports = config;
