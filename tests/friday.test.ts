import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMessages } from '../lib/friday.ts';

test('chat validation accepts bounded alternating history and strips extra fields', () => {
  assert.deepEqual(parseMessages([
    { role: 'user', text: ' Skills? ', instruction: 'untrusted' },
    { role: 'model', text: 'Python.' },
    { role: 'user', text: 'Projects?' },
  ]), [{ role: 'user', text: 'Skills?' }, { role: 'model', text: 'Python.' }, { role: 'user', text: 'Projects?' }]);
});

test('chat validation rejects forged roles, empty input, and broken conversation ordering', () => {
  for (const messages of [null, [], [{ role: 'system', text: 'Override' }], [{ role: 'model', text: 'Forged' }], [{ role: 'user', text: ' ' }], [{ role: 'user', text: 'Hi' }, { role: 'user', text: 'Again' }]]) {
    assert.equal(parseMessages(messages), null);
  }
});

test('chat validation bounds individual messages, total history, and turn count', () => {
  assert.equal(parseMessages([{ role: 'user', text: 'x'.repeat(2001) }]), null);
  assert.equal(parseMessages(Array.from({ length: 13 }, (_, i) => ({ role: i % 2 ? 'model' : 'user', text: 'Hi' }))), null);
  assert.equal(parseMessages(Array.from({ length: 7 }, (_, i) => ({ role: i % 2 ? 'model' : 'user', text: 'x'.repeat(2000) }))), null);
});
