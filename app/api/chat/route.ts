import { fridayInstruction, parseMessages } from '@/lib/friday';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// A conservative per-process ceiling. Google's free-project quota is authoritative
// across server instances; do not enable paid billing for a zero-cost API setup.
let windowStart = Date.now();
let requests = 0;
let active = 0;
const headers = { 'Cache-Control': 'no-store' };
const reply = (error: string, status: number) => Response.json({ error }, { status, headers });

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  // Next.js can use an internal hostname in request.url behind a proxy.
  // Compare with the actual request Host so local and hosted chat both work.
  if (origin) {
    try {
      const source = new URL(origin);
      if (!['http:', 'https:'].includes(source.protocol) || source.host !== (request.headers.get('host') || new URL(request.url).host)) return reply('Please use Friday from this website.', 403);
    } catch { return reply('Please use Friday from this website.', 403); }
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply('Please send a text message.', 415);
  const key = process.env.GEMINI_API_KEY;
  if (!key) return reply('Friday is not connected yet. You can reach Zisan on the Contact page.', 503);

  // Read a bounded stream so a large request cannot exhaust server memory.
  const reader = request.body?.getReader();
  if (!reader) return reply('Please enter a message.', 400);
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.length;
    if (bytes > 48000) { await reader.cancel(); return reply('This conversation is too long. Please start a new chat.', 413); }
    chunks.push(value);
  }
  let messages;
  try { messages = parseMessages(JSON.parse(Buffer.concat(chunks).toString('utf8')).messages); }
  catch { return reply('Please enter a valid message.', 400); }
  if (!messages) return reply('Please start a new chat or shorten your message.', 400);
  if (Date.now() - windowStart >= 60000) { windowStart = Date.now(); requests = 0; }
  if (requests >= 5 || active >= 2) return reply('Friday is busy. Please try again in a minute.', 429);
  requests++;
  active++;
  try {
    const model = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
    if (!/^[a-zA-Z0-9.-]+$/.test(model)) return reply('Friday is temporarily unavailable.', 503);
    const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: fridayInstruction() }] },
        contents: messages.map(({ role, text }) => ({ role, parts: [{ text }] })),
        generationConfig: { maxOutputTokens: 700, temperature: 0.3 },
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (result.status === 429) return reply('Friday has reached its free usage limit. Please try again later or contact Zisan directly.', 429);
    if (!result.ok) return reply('Friday could not connect right now. Please try again later or visit Contact.', 503);
    const data = await result.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.filter((part: { text?: string; thought?: boolean }) => typeof part.text === 'string' && !part.thought).map((part: { text: string }) => part.text).join('').trim();
    if (!text || candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION') return reply('Friday could not answer that. Try asking about Zisan’s skills or projects.', 422);
    return Response.json({ text: text.slice(0, 4000) }, { headers });
  } catch {
    return reply('Friday could not connect right now. Please try again shortly.', 503);
  } finally { active--; }
}
