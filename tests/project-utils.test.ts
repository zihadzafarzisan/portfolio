import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, projectCategories, youtubeEmbed } from '../lib/project-utils.ts';

// Synthetic records are test data only; they are never included in the website.
const records = [
  { id: 'one', title: 'Searchable alpha', category: 'Web application', summary: 'A test fixture', description: '', tools: ['SQLite'], featured: false },
  { id: 'two', title: 'Beta', category: 'Automation', summary: '', description: 'A scheduler', tools: ['Python'], featured: true },
  { id: 'three', title: 'Gamma', category: 'Web application', summary: '', description: '', tools: [] },
];
test('categories derive from real records and deduplicate', () => {
  assert.deepEqual(projectCategories(records), ['All work', 'Web application', 'Automation']);
  assert.deepEqual(projectCategories([]), ['All work']);
});
test('category and case-insensitive trimmed search combine across tools and description', () => {
  assert.deepEqual(filterProjects(records, 'All work', ' sqlite ').map((p) => p.id), ['one']);
  assert.deepEqual(filterProjects(records, 'Automation', 'SCHEDULER').map((p) => p.id), ['two']);
  assert.deepEqual(filterProjects(records, 'Web application', 'Python'), []);
});
test('featured records sort first without mutating source', () => {
  assert.deepEqual(filterProjects(records, 'All work', '').map((p) => p.id), ['two', 'one', 'three']);
  assert.equal(records[0].id, 'one');
});
test('only real HTTPS YouTube hosts and valid video IDs become privacy embeds', () => {
  assert.equal(youtubeEmbed('https://youtu.be/abcdefghijk'), 'https://www.youtube-nocookie.com/embed/abcdefghijk?autoplay=1');
  assert.equal(youtubeEmbed('https://www.youtube.com/watch?v=abcdefghijk'), 'https://www.youtube-nocookie.com/embed/abcdefghijk?autoplay=1');
  for (const invalid of ['javascript:alert(1)', 'https://youtube.com.evil.test/watch?v=abcdefghijk', 'http://youtu.be/abcdefghijk', 'https://youtu.be/bad', 'broken']) assert.equal(youtubeEmbed(invalid), null);
});
