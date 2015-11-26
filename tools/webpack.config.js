import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const WATCH = global.WATCH === undefined ? false : global.WATCH;
const DEBUG = !process.argv.includes('release');
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
};

const styleLoaders = [
  'css-loader?modules&importLoaders=1&localIdentName=' + (
    DEBUG ?
      '[name]__[local]___[hash:base64:5]' :
      '[hash:base64:5]'
  ),
  'postcss-loader'
].join('!');

export default {
  cache: DEBUG,
  debug: DEBUG,
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: false,
    version: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry: [
    ...(WATCH ? [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ] : []),
    path.join(__dirname, '../src/app.js')
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: DEBUG ? '[name].bundle.js' : '[name].[hash].bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new ExtractTextPlugin('[name].[hash].bundle.css', {
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.tpl.html'),
        isProduction: true
      })
    ] : [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.tpl.html')
      })
    ]),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin()
    ] : [])
  ],
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        loader: 'babel-loader?optional[]=runtime'
      },
      {
        test: /\.css$/,
        loader: DEBUG ?
          `style-loader!${styleLoaders}` :
          ExtractTextPlugin.extract('style-loader', styleLoaders)
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=2000&name=images/[name].[ext]'
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ]
};
