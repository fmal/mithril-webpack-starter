import Task from './utils/Task';

global.WATCH = true;

const task = new Task('start', function startTask() {
  return new Promise(async resolve => {
    await require('./build').run();
    await require('./browserSync').run();

    resolve();
  });
});

export default async function start() {
  return await task.run()
    .catch((err) => {
      console.error(err.stack);
    });
}
