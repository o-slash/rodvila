const program = require('commander');
const markdown = require('markdown-it');
const officegen = require('officegen');
const version = require('./package.json').version;

let sources;

const generate = (srcs, out, fmt) => {
  console.log('Sources:', srcs.join(','));
  console.log('Output file:', out);
  console.log('Output format:', fmt);
};

program
  .version(version)
  .arguments('<source> [others...]')
  .option('-o, --output-file [file]', 'Set output file', /^.*\.(docx|pptx)$/i, 'stdout')
  .option('-f, --output-format [type]', 'Set output file format [docx|pptx]', /^(docx|pptx)$/i, 'docx')
  .action((source, others) => sources = [source, ...others])
  .parse(process.argv);

if (typeof sources === 'undefined' || sources.length < 1) {
  console.error('No source file given!');
  console.error(program.helpInformation());
  process.exit(1);
}

generate (sources, program.outputFile, program.outputFormat);
