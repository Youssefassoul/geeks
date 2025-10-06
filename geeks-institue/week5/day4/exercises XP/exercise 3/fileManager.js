import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readFile(filePath) {
    const resolvedPath = path.join(__dirname, filePath);
    return fs.readFileSync(resolvedPath, 'utf8');
}

export function writeFile(filePath, content) {
    const resolvedPath = path.join(__dirname, filePath);
    fs.writeFileSync(resolvedPath, content, 'utf8');
}
