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
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    alias: {
      vue: 'vue/dist/vue.js'
    },
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ProvidePlugin({
      Vue: 'vue',
      Vuex: 'vuex',
      axios: 'axios',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // NODE_ENV: '"production"'
      },
    }),
  ],
};
