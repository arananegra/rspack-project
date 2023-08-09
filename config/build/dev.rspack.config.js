const { merge } = require('webpack-merge');
const common = require('./base.rspack.config');
const helpers = require('./helpers');
const { defineConfig } = require('@rspack/cli');

const config = defineConfig(
	merge(common, {
		mode: 'production',
		devtool: 'inline-source-map',
		watchOptions: {
			ignored: /node_modules/,
		},
		output: {
			clean: true,
			path: helpers.resolveFromRootPath('dist-dev'),
			filename: '[name].js',
		},

		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				name: false,
				cacheGroups: {
					vendors: {
						name: 'vendor',
						test: /vendor$/,
						chunks: 'initial',
						enforce: true,
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
		},

		devServer: {
			static: {
				directory: helpers.resolveFromRootPath('dist-dev'),
			},
			port: 3002,
			allowedHosts: 'all',
		},

		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[path][name]---[local]',
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
					type: 'css',
				},
			],
		}
	}),
);
module.exports = config;
