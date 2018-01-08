const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.webpack.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: false
                        }
                    }]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    watchOptions: {
        ignored: /node_modules/
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]

};