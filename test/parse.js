var assert = require('assert');
var rodvila = require('../');

describe('CLI Parsing', function () {
  var cmdWithoutArgs = rodvila.parseCli(['/usr/bin/node', '../bin/cli.js']);
  var cmdWithArgs = rodvila.parseCli(['/usr/bin/node', '../bin/cli.js', 'source1.md', 'source2.md', '-o', 'dest.pptx', '-f', 'pptx']);
  
  describe('with no arguments', function () {
    it('should have no source files', function (done) {
      assert.equal(0, cmdWithoutArgs.args.length);
      done();
    });

    it('should have stdout as output file', function (done) {
      assert.equal('stdout', cmdWithoutArgs.outputFile);
      done();

    });

    it('should have docx as output format', function (done) {
      assert.equal('docx', cmdWithoutArgs.outputFormat);
      done();
    var cmdWithArgs = require('../').parseCli(['/usr/bin/node', '../bin/cli.js', 'source1.md', 'source2.md', '-o', 'dest.pptx', '-f', 'pptx']);

    });
  });

  describe('with two arguments and -o and -f options', function (done) {
    it('should have two source files', function (done) {
      assert.equal(2, cmdWithArgs.args.length);
      done();

    });

    it('should have first passed argument as first source file', function (done) {
      assert.equal('source1.md', cmdWithArgs.args[0]);
      done();

    });

    it('should have second passed argument as second source file', function (done) {
      assert.equal('source2.md', cmdWithArgs.args[1]);
      done();

    });

    it('should have -o value as output file', function (done) {
      assert.equal('dest.pptx', cmdWithArgs.outputFile);
      done();

    });

    it('should -f value as output format', function (done) {
      assert.equal('pptx', cmdWithArgs.outputFormat);
      done();

    });
  });

});