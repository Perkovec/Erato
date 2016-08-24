#!/usr/bin/env node
const program = require('commander');

program
  .arguments('init')
  .action(() => {
    console.log(process.cwd())
  })
  .parse(process.argv);