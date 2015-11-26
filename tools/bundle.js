import Task from './utils/Task';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

export default new Task('bundle', function bundleTask() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfig);

    function onComplete(err, stats) {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig.stats));

      return resolve();
    }

    if (global.WATCH) {
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
});
