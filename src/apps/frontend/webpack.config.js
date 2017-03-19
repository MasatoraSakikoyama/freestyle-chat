const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.ProvidePlugin({
            $: 'cash-dom',
            axios: 'axios',
            THREE: 'three'
        })
    ]
}
