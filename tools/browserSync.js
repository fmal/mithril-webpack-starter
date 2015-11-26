import Task from './utils/Task';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default new Task('browserSync', function browserSyncTask() {
  return new Promise(resolve => {
    const bundler = webpack(webpackConfig);
    const bs = browserSync.create().init({
      server: {
        baseDir: 'dist',
        middleware: [
          webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: webpackConfig.stats
          }),
          webpackHotMiddleware(bundler)
        ]
      },

      // no need to watch '*.js' here, webpack will take care of it
      files: []
    }, () => {
      resolve(bs);
    });
  });
});
