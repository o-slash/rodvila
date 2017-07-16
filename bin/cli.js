#!/usr/bin/env node

'use strict';

var rodvila = require('../');

let cli = rodvila.parse(process.argv);

if (typeof cli.sources === 'undefined' || cli.sources.length < 1) {
  console.error('No source file given!');
  console.error(cli.helpInformation());
  process.exit(1);
}

rodvila.generate(cli.sources, cli.outputFile, cli.outputFormat);