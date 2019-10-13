const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const limit = 100000;
const dest = 'dist';

module.exports = {
    entry: "./src/App.js",
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        port: 4400
    },
    output: {
        path: resolve(__dirname, dest),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit,
                            mimetype: 'application/octet-stream'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit,
                            mimetype: 'image/svg+xml'
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};