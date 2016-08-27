const readline = require('readline');
const fs = require('fs');
const path = require('path');
const colors = require('ansicolors');
const defaultConfig = require('./config.example.json');
const defaultBuildfile = require('./buildfile.example.json');
const utils = require('./utils');

const redCross = colors.red('✗');
const greenCheck = colors.green('✓');
const cyan = colors.cyan;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(quest) {
  return new Promise((resolve, reject) => {
    rl.question(quest, resolve);
  });
};

function writeFile(dir, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dir, content, err => {
      if (err) reject(err);
      resolve();
    });
  });
}

function makeDirs(dir) {
  const sourcesDir = path.join(dir, 'sources');
  const postsDir = path.join(dir, 'sources', 'posts');
  const draftsDir = path.join(dir, 'sources', 'drafts');
  const templateDir = path.join(dir, 'template');

  // %dir%/sources
  utils.makeDirCond(sourcesDir,
    redCross + cyan(' sources/ already exists'),
    greenCheck + cyan(' sources/ created'));

  // %dir%/sources/posts
  utils.makeDirCond(postsDir,
    redCross + cyan(' sources/posts/ already exists'),
    greenCheck + cyan(' sources/posts/ created'));

  // %dir%/sources/posts
  utils.makeDirCond(draftsDir,
    redCross + cyan(' sources/drafts/ already exists'),
    greenCheck + cyan(' sources/drafts/ created'));

  // %dir%/template
  utils.makeDirCond(templateDir,
    redCross + cyan(' template/ already exists'),
    greenCheck + cyan(' template/ created'));
}

module.exports = dir => {
  const config = {};

  question('Blog title: ').then(title => {
    if (title) config.title = title;
    return question('Blog description: ');
  }).then(description => {
    if (description) config.description = description;
    return question('Blog author: ');
  }).then(author => {
    if (author) config.author = author;
    return question('Blog language: ');
  }).then(language => {
    if (language) config.language = language;
    const completeConfig = Object.assign(config, defaultConfig);
    return writeFile(path.join(dir, 'config.json'), JSON.stringify(completeConfig, null, 2));
  }).then(() => {
    console.log(greenCheck + cyan(' config.json created'));
    return writeFile(path.join(dir, 'buildfile.json'), JSON.stringify(defaultBuildfile, null, 2));
  }).then(() => {
    console.log(greenCheck + cyan(' buildfile.json created'));
    makeDirs(dir);
    rl.close();
  },

  err => {
    console.log(err);
    rl.close();
  });
};
