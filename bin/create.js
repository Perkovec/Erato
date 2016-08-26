const path = require('path');
const colors = require('ansicolors');
const mkdirp = require('mkdirp');
const utils = require('./utils');

const redCross = colors.red('✗');
const greenCheck = colors.green('✓');
const cyan = colors.cyan;
const red = colors.red;

module.exports = (dir, title, layout) => {
  if (layout === 'post') {
    const postsPath = path.join(dir, 'sources', 'posts');
    if (!utils.existsDir(postsPath)) return console.log(red('could not find dir sources/posts/'));
    const currentDate = new Date();
    const dateVars = {
      year: '' + currentDate.getFullYear(),
      month: ('0' + (currentDate.getMonth() + 1)).slice(-2),
      day: ('0' + currentDate.getDate()).slice(-2),
    };
    const todayPath = path.join(postsPath, dateVars.year, dateVars.month, dateVars.day);
    console.log(todayPath);
    if (!utils.existsDir(todayPath)) mkdirp.sync(todayPath);
  }
};
