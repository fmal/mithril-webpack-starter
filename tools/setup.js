import Task from './utils/Task';
import { makeDir, copyFiles } from './utils/fileUtils';
import del from 'del';

export default new Task('setup', function setupTask() {
  return new Promise(async resolve => {
    await del(['dist']);
    await makeDir('dist');
    await Promise.all([
      copyFiles('src/vendor', 'dist/vendor'),
      copyFiles('src/favicons', 'dist/favicons'),
    ]);

    resolve();
  });
});
