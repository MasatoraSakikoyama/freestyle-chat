const path = require('path');
const webpack = require('webpack');
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  watchOptions: {
    poll: true,
    ignore: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: { minimize: true },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /index\.html|404\.html|500\.html$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]' },
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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: debug,
      beautify: debug,
      mangle: {
        screw_ie8: !debug,
        keep_fnames: !debug,
      },
      compress: {
        screw_ie8: !debug,
        warnings: debug,
      },
      comments: debug,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: !debug,
      debug: debug,
      options: { context: __dirname },
    }),
    new webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
      Vuex: ['vuex/dist/vuex.esm.js', 'default'],
      axios: 'axios',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: debug ? '"develop"' : '"production"',
      },
    }),
  ],
};
