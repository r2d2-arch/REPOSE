const fs = require('fs');
const readline = require('readline');

const inputFilePath = 'dump.sql';
const outputFilePath = 'new_api_2025';

const rl = readline.createInterface({
  input: fs.createReadStream(inputFilePath),
  output: process.stdout,
  terminal: false
});

const outputStream = fs.createWriteStream(outputFilePath);

rl.on('line', (line) => {
  outputStream.write(line + '\n');
});

rl.on('close', () => {
  console.log('Parsing completed!');
});
