#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const colors = require('ansicolors');
const utils = require('./utils');

const redCross = colors.red('✗');
const greenCheck = colors.green('✓');
const cyan = colors.cyan;

program
  .arguments('init')
  .action(() => {
    const dir = process.cwd();
    const sourcesDir = path.join(dir, 'sources');
    const postsDir = path.join(dir, 'sources', 'posts');
    const draftsDir = path.join(dir, 'sources', 'drafts');
    const templateDir = path.join(dir, 'template');

    // %dir%/sources
    utils.makeDirCond(sourcesDir,
      redCross + cyan(' source/ already exists'),
      greenCheck + cyan(' source/ created'));

    // %dir%/sources/posts
    utils.makeDirCond(postsDir,
      redCross + cyan(' source/posts/ already exists'),
      greenCheck + cyan(' source/posts/ created'));

    // %dir%/template
    utils.makeDirCond(templateDir,
      redCross + cyan(' template/ already exists'),
      greenCheck + cyan(' template/ created'));
  })
  .parse(process.argv);
