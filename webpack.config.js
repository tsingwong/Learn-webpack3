/*
 * @Author: tsingwong 
 * @Date: 2017-11-14 18:30:58 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2017-11-19 22:01:49
 */
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCssPlugin = require('purifycss-webpack');

const entry = require('./build/entry.webpack.js');

module.exports = {
    devtool: 'source-map',
    // entry: {
    //     one: './src/entry.js',
    //     two: './src/entry2.js',
    // },
    entry: entry.path,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        // publicPath: 'http://127.0.0.1:8081/',
        // 相对路径
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            // 
                            // modules: true
                            // 用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                            importLoaders: 1
                        }
                    },{
                        loader: 'postcss-loader'
                    }]
                }),
                // 必处理文件
                include: /src/,
                // 必不处理文件
                exclude: /node_modules/,
                // query 额外配置
                // query:
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // byte
                            limit: 500,
                            // 输出到 img 文件夹下
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.(html|htm)$/i,
                // 默认会去除换行符，min=false 为不去除换行符
                use: ['html-withimg-loader?min=false']
            },
            {
                test: /\.less$/,
                // less 打包到 js 中
                // use: ['style-loader', 'css-loader', 'less-loader'] 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ {
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }]
                })
            },
            {
                test: /\.scss$/,
                // sass 打包到 js 中
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            }, {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        // 压缩 js
        // new UglifyJsPlugin(
            
        // ),
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
        new ExtractTextPlugin('css/index.css'),
        new PurifyCssPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        // 自动加载模块，而不必到处 import 或 require 
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.BannerPlugin({
            banner: '@Author: TsingWong'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // 同上面的入口名
            name: ['jquery', 'vue'],
            // 抽离路径
            filename: 'assets/commonJs/[name].js',
            // // 数量必须大于等于2，或者少于等于 chunks的数量
            minChunks: 2,

        })
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
        maxAssetSize: 400000,
    },
    watchOptions: {
        // 指定毫秒为单位进行轮询
        poll: 1000,
        // 当第一个文件更改，会在重新构建前增加延迟。
        // 这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里
        // 默认 300
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
};
