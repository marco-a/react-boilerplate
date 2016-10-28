var webpack = require('webpack')
var path = require('path')
var HTMLWebpackPlugin = require('html-webpack-plugin')

var __SRC__ = path.resolve(__dirname, 'src')
var __DIST__ = path.resolve(__dirname, 'dist')

// Clean /dist/ folder on build
var spawnSync = require('child_process').spawnSync

spawnSync('rm', ['-r', __DIST__])
spawnSync('mkdir', [__DIST__])

module.exports = {
	entry: {
		'app': path.resolve(__SRC__, 'App.jsx')
	},

	output: {
		path: __DIST__,
		filename: '[name].bundle.js'
	},

	module: {
		loaders: [{
			test: /\.jsx$/,
			loader: 'babel-loader',

			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.js$/,
			loader: 'babel-loader',

			query: {
				presets: ['es2015']
			}
		}]
	},

	plugins: [new webpack.optimize.CommonsChunkPlugin({
		name: 'common'
	}), new HTMLWebpackPlugin({
		filename: 'app.html',
		template: path.resolve(__SRC__, 'template.html')
	})]
}