import { mkdir, writeFile } from 'fs/promises';
import path, { join } from 'path';
import { calculate } from './lib/calculator.js';
import { direxists, readFile, readFilesFromDir } from './lib/file.js';
import { indexTemplate, statsTemplate } from './lib/html.js';
import { parse } from './lib/parser.js';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main() {
  // Búa til `./dist` ef ekki til
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  const dataFiles = await readFilesFromDir(DATA_DIR);
  const results = [];

  for (const file of dataFiles) {
    // eslint-disable-next-line no-await-in-loop
    const content = await readFile(file);

    if (content) {
      const title = path.basename(file);
      const numbers = parse(content);
      const stats = calculate(numbers);
      const filename = `${title}.html`;

      const result = {
        title,
        filename,
        numbers,
        stats,
      };
      results.push(result);

      const filepath = join(OUTPUT_DIR, filename);
      const template = statsTemplate(title, result);

      // eslint-disable-next-line no-await-in-loop
      await writeFile(filepath, template, { flag: 'w+' });
    }
  }

  const filepath = join(OUTPUT_DIR, 'index.html');
  const template = indexTemplate(results);

  await writeFile(filepath, template, { flag: 'w+' });
}

main().catch((err) => console.error(err));
