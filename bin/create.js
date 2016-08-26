const path = require('path');
const fs = require('fs');
const colors = require('ansicolors');
const mkdirp = require('mkdirp');
const utils = require('./utils');

const redCross = colors.red('✗');
const greenCheck = colors.green('✓');
const cyan = colors.cyan;
const red = colors.red;

const defaultHeader =
`------------------------
title: Test title
author: Perkovec
date: 27.08.2016 01:17
------------------------`;

module.exports = (dir, title, layout) => {
  if (layout === 'post') {
    const postsPath = path.join(dir, 'sources', 'posts');
    if (!utils.existsPath(postsPath)) {
      return console.log(red('could not find dir sources/posts/'));
    }

    const currentDate = new Date();
    const dateVars = {
      year: '' + currentDate.getFullYear(),
      month: ('0' + (currentDate.getMonth() + 1)).slice(-2),
      day: ('0' + currentDate.getDate()).slice(-2),
    };

    const todayPath = path.join(postsPath, dateVars.year, dateVars.month, dateVars.day);
    if (!utils.existsPath(todayPath)) {
      mkdirp.sync(todayPath);
    }

    const articlePath = path.join(todayPath, title + '.md');
    if (utils.existsPath(articlePath)) {
      return console.log(red(`article "${title}" already created`));
    }

    fs.writeFileSync(articlePath, defaultHeader);
  }
};
