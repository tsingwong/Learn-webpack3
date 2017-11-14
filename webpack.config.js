/*
 * @Author: tsingwong 
 * @Date: 2017-11-14 18:30:58 
 * @Last Modified by: tsingwong
 * @Last Modified time: 2017-11-14 22:55:11
 */
const path = require('path');
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
            warnings: true,
            errors: true
        }
    }
};
