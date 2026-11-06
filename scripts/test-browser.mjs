import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { resolve } from 'node:path';

// Spawn Node directly so preview cleanup also works on Windows without shell process trees.
const environment = { ...process.env, PORT: '3020' };
if (environment.FORCE_COLOR) delete environment.NO_COLOR;
const server = spawn(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1'], { env: environment, stdio: 'inherit' });
let runner;
process.once('SIGINT', () => { runner?.kill(); server.kill(); });
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error('The Next.js preview could not start.');
    try { ready = (await fetch('http://127.0.0.1:3020')).ok; } catch { /* Server is starting. */ }
    if (ready) break;
    await new Promise((done) => setTimeout(done, 100));
  }
  if (!ready) throw new Error('The Next.js preview did not become ready.');
  runner = spawn(process.execPath, [resolve('node_modules/@playwright/test/cli.js'), 'test', ...process.argv.slice(2)], { env: environment, stdio: 'inherit' });
  const [code] = await once(runner, 'exit');
  process.exitCode = code ?? 1;
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    const stopped = once(server, 'exit');
    server.kill();
    await stopped;
  }
}
