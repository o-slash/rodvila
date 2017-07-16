#!/usr/bin/env node
'use strict';

var rodvila = require('../');

var command = rodvila.parseCli(process.argv);

if (typeof command.args === 'undefined' || command.args.length < 1) {
  console.error('No source file given!');
  console.error(command.helpInformation());
  process.exit(1);
}

rodvila.generate(command);