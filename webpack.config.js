const path = require('path');
const webpack = require ('webpack');
const HTMLwebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'developmemt';
const isProd = !isDev;


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    
    devServer: {
       hot: isDev,
        port: 3000
    },
    resolve: {
        extensions: ['.js'],
        alias: {
           '@': path.resolve(__dirname, 'src')
        }
    },
    entry: {
        main: ['@babel/polyfill','@/js/main.js'],
        /*analytics: '@/js/analytics.js'*/
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    plugins: [
        new HTMLwebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'src/assets/img/myFoto.jpg'),
                    to: path.resolve(__dirname, 'dist/assets/img/myFoto.jpg')
                },
                {
                    from: path.resolve(__dirname, 'src/assets/img/logoBrands'),
                    to: path.resolve(__dirname, 'dist/assets/img/logoBrands')
                },
                {
                    from: path.resolve(__dirname, 'src/php/mail.php'),
                    to: path.resolve(__dirname, 'dist/mail.php')
                }
            ]
        }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
              })
        ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            }
        ]
    }
};