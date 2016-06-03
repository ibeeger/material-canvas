/* 
 * @Author: willclass
 * @Date:   2016-02-17 15:35:45
 * @Last Modified by:   willclass
 * @Last Modified time: 2016-06-03 17:52:21
 */

'use strict';

var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
	 	name:"common",
        minChunks: 2
});

var minjs = new webpack.optimize.UglifyJsPlugin({
	minimize: true,
	compress:{
		warnings:false
	}
})

var prod = new webpack.DefinePlugin({
  "process.env": { 
     NODE_ENV: JSON.stringify("production") 
   }
})

module.exports = {
	entry: {
		index: "./src/app.js",
	},
	output: {
		path: "./dist",
		filename: "[name].js"
	},
	module: {
		loaders: [
			// {
			// 	test: /\.css$/,
			// 	loader: 'style-loader!css-loader'
			// }, 
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: 'babel-loader?presets[]=es2015&presets[]=react'
			}
		]
	},
	plugins: [
		commonsPlugin,
		// minjs,
		prod
	]
};