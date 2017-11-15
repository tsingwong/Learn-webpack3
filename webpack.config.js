/*
 * @Author: tsingwong 
 * @Date: 2017-11-14 18:30:58 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2017-11-15 19:43:43
 */
const path = require('path');
// const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        one: './src/entry.js',
        two: './src/entry2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ],
                // 必处理文件
                include: /src/,
                // 必不处理文件
                exclude: /node_modules/,
                // query 额外配置
                // query:
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin(
            
        ),
        new HtmlWebpackPlugin({
            // 当定义模版时，该配置不生效
            title: 'webpack Demo',
            // 传递 html-minifier 选项给 minify 输出
            minify:{
                // 去除 html 中的双引号
                // removeAttributeQuotes: true
            },
            // 添加一个唯一的 hash 在 js 文件和 CSS 文件名
            hash: true,
            template: './src/index.html'
        }),
    ],
    devServer: {
        // 绝对路径可以保证各个系统一致
        contentBase: path.resolve(__dirname, 'dist'),
        // 获取当前的ip
        host: process.env.HOST,
        // 开启 gzip 压缩
        compress: true,
        // 默认端口是 8080
        port: 8081,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    performance: {
        // 打开错误警告
        hints: 'warning',
        // 入口资源大小，默认 250 000 bytes
        maxEntrypointSize: 400000,
        // 生成资源大小，默认同上
        maxAssetSize: 200000,
    }
};
