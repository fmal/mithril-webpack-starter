import mkdirp from 'mkdirp';
import cpr from 'cpr';

const makeDir = (name) => new Promise((resolve, reject) => {
  mkdirp(name, err => err ? reject(err) : resolve());
});

const copyFiles = (source, dest) => new Promise((resolve, reject) => {
  cpr(source, dest, err => err ? reject(err) : resolve());
});

export { makeDir, copyFiles };
