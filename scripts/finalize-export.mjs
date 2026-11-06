import { copyFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

// Next 16.3 can retain Windows path separators in exported segment filenames.
// The browser requests dotted names, so provide those files on every static host.
let copied = 0;
async function flattenSegments(directory, destination, prefix) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = join(directory, entry.name);
    const filename = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await flattenSegments(source, destination, filename);
    else if (entry.isFile() && entry.name.endsWith('.txt')) {
      await copyFile(source, join(destination, filename));
      copied++;
    }
  }
}

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === '_next') continue;
    const child = join(directory, entry.name);
    if (entry.name.startsWith('__next.')) await flattenSegments(child, directory, entry.name);
    else await visit(child);
  }
}

await visit(resolve('out'));
console.log(`Static export ready; normalized ${copied} segment prefetch files.`);
