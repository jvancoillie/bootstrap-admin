const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm


module.exports = {
    entry: {
        'js/bootstrap-admin': path.resolve(__dirname, '../js/bootstrap-admin.js'),
        'css/bootstrap-admin': path.resolve(__dirname, '../scss/bootstrap-admin.scss'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath:  "/"
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin([
            'dist/js',
            'dist/css'
        ],{
            root:     path.resolve(__dirname, '../'),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new ExtractTextPlugin({ // define where to save the file
            filename: '[name].css',
            allChunks: true,
        })
    ],
    module: {

        rules: [
            // JS files
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, '../node_modules'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: path.resolve(__dirname, '../.tmp')
                        }
                    }
                ]
            },
            // SCSS files
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // url: false,
                                // minimize: true,
                                importLoaders: 1,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    path.resolve(__dirname, '../node_modules'),
                                    path.resolve(__dirname, '../scss')
                                ]
                            }
                        }
                    ]
                })
            },
            // CSS files
            {
                test: /\.css/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                            convertToAbsoluteUrls: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,  // This option activates css modules
                            importLoaders: 1,
                            sourceMap: true
                        }
                    }
                ]
            },

            /*----------  Static files  ----------*/

            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000
                        }
                    }
                ]
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 100000
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }

        ]
    }
};


