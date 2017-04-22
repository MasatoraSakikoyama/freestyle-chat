const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html?minimize',
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?minimize'],
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ProvidePlugin({
      axios: 'axios',
      Vue: 'vue',
      Vuex: 'vuex',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: '"production"'
      },
    }),
  ],
};
