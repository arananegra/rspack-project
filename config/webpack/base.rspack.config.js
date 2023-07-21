const webpack = require('webpack');
const path = require('path');
const helpers = require('./helpers');
const { defineConfig } = require('@rspack/cli');
const HtmlRspackPlugin = require('@rspack/plugin-html');

const config = defineConfig({
	context: helpers.resolveFromRootPath('src'),
	entry: {
		styles: ['./scss/index.scss'],
		app: ['../index.tsx'],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
		alias: {
			layout: path.resolve(__dirname, '../../src/layout/'),
			scenes: path.resolve(__dirname, '../../src/scenes/'),
			core: path.resolve(__dirname, '../../src/core/'),
			pods: path.resolve(__dirname, '../../src/pods/'),
			common: path.resolve(__dirname, '../../src/common/'),
			styles: path.resolve(__dirname, '../../src/scss/'),
		},
	},
	target: 'web',

	module: {
		rules: [
			{
				test: /\.js$/,
				type: 'jsx',
			},
			{
				test: /\.ts$/,
				type: 'tsx',
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
			},
			{
				test: /\.svg$/,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack'],
			},
			{
				test: /\.(png|jpg|jpeg|ico|gif)?$/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlRspackPlugin({
			filename: 'index.html', //Name of file in ./dist/
			template: 'index.html', //Name of template in ./src
			hash: true,
			scriptLoading: 'defer',
		}),
		new webpack.IgnorePlugin({
			resourceRegExp: new RegExp('/^\\.\\/locale$/, /moment$/'),
		}),
	],
});
module.exports = config;
