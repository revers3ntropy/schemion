const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const PACKAGE_JSON = JSON.parse(String(fs.readFileSync("./package.json")));

const config = {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
			cleanOnceBeforeBuildPatterns: [
				path.resolve(__dirname, 'dist'),
			],
		}),
		new webpack.DefinePlugin({
			__CONST_VERSION: PACKAGE_JSON.version
		})
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.[tj]sx?$/,
				loader: 'string-replace-loader',
				options: {
					search: '__VERSION__',
					replace: PACKAGE_JSON.version,
					flags: 'g'
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	entry: './src/main.ts',
	target: 'node',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
		libraryExport: 'default',
		library: 'schemion',
		globalObject: 'this || global || window',
		umdNamedDefine: true,
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
			terserOptions: {}
		})],
	},
	devtool: 'source-map'
};

module.exports = config;
