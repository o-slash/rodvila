#!/usr/bin/env node

'use strict';

var rodvila = require('../');

let options = rodvila.parseCli(process.argv);

if (typeof options.sources === 'undefined' || options.sources.length < 1) {
  console.error('No source file given!');
  console.error(options.parser.helpInformation());
  process.exit(1);
}

rodvila.generate(options.sources, options.outputFile, options.outputFormat);