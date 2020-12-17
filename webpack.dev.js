var path = require('path'),
    CopyPlugin = require('copy-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

var cfg = {
    srcPath: path.resolve('./src'),
    distPath: path.resolve('./dist')
}

module.exports = {
    entry: path.join(cfg.srcPath, 'ts/main.ts'),
    devtool: 'inline-source-map',
	output: {
        path: cfg.distPath,
        filename: '[name].[contenthash].js'
	},

	devServer: {
		open: false,
		contentBase: [
			cfg.srcPath,
		],
		port: 8000,
    },
    
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
        ],
    },

    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },

	plugins: [
        new CleanWebpackPlugin(),
        /*
        new CopyPlugin({
            patterns: [
              { from: path.join(cfg.srcPath, 'assets'), to: path.join(cfg.distPath, 'assets') },
            ],
        }),//*/
        new HtmlWebpackPlugin()
      ]
};