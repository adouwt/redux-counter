'use strict';
// 获取文件目录下文件
const glob = require('glob');
const path = require('path');
// 压缩css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 将js css 等自动插进HTML 模板中
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清空上一次打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包进度显示
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const serMpa = () => {
    const entry = {};
     
    const HtmlWebpackPlugins = [];
    // glob 获取通配文件
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    // console.log(entryFiles, 'entrys');
        // /src/search/index.js
    entryFiles.forEach((item) => {
        // console.log(item);
        let pageName = item.match(/src\/(.*)(\/index\.js)$/); // 此处正则不严谨
        entry[pageName[1]] = './' + pageName[0];
        // entry: {
        //     index: './src/index.js',
        //     search: './src/search.js'
        // },

        HtmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName[1]}/index.html`),
                filename: `${pageName[1]}.html`,
                chunks: [pageName[1]],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            }),
        )
    })
    // console.log(entry);
    
    return {
        entry,
        HtmlWebpackPlugins
    }
}
const {entry, HtmlWebpackPlugins} = serMpa();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, `dist`),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        new ProgressBarPlugin()
    ].concat(HtmlWebpackPlugins)
};
