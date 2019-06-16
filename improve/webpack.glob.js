'use strict';
const webpack = require('webpack');
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
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

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
                loading: '页面正在努力加载中。。。',
                filename: `${pageName[1]}.html`,
                chunks: ['vendors', pageName[1]],
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
        // path: '/home/proj/cdn/assets/[hash]',
        filename: '[name]_[chunkhash:8].js',
        // chunkFilename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 0,
        //   maxSize: 0,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true, 
          cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'all',
                minChunks: 2,
            },
          }
        }
    },
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
                    'less-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUni: 75,
                            remPrecision: 8 // rem 的小数点数
                        }
                    }
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
        new webpack.BannerPlugin({
            // 打包到文件中
            banner: '+++++ adouwt 版权拥有，侵权必究，+++++++'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //           module: 'react',
        //           entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
        //           global: 'React',
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
        //             global: 'ReactDOM',
        //         },
        //       ],
        // })
    ].concat(HtmlWebpackPlugins),
    devtool: 'inline-source-map',
    mode: 'production',
};
