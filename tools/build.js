import Task from './utils/Task';

export default new Task('build', function buildTask() {
  return new Promise(async resolve => {
    await require('./setup').run();
    await require('./bundle').run();

    resolve();
  });
});
