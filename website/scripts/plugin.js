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

function applyRandomStyle(line) {
  const randomStyle = Math.floor(Math.random() * 3);

  if (randomStyle === 0) {
    return line + ' #$%!&';
  } else if (randomStyle === 1) {
    return line.toUpperCase();
  } else {
    return line.replace(/[aeiou]/gi, (match) => String.fromCharCode(Math.floor(Math.random() * 26) + 97));
  }
}

rl.on('line', (line) => {
  const styledLine = applyRandomStyle(line);
  outputStream.write(styledLine + '\n');
});

rl.on('close', () => {
  console.log('Parsing with styles completed!');
});
