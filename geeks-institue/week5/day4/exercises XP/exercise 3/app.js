import { readFile, writeFile } from './fileManager.js';

// Read from hello_world.txt
const content = readFile('hello_world.txt');
console.log('Content of hello_world.txt:', content);

// Write to bye_world.txt
writeFile('bye_world.txt', 'Writing to the file');
console.log('Content successfully written to bye_world.txt!');