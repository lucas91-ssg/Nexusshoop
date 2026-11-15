// NexusShop — Raahnuma proxy v2: origin allowlist + rate-limit + errores visibles + fallback de modelos
const ALLOWED = ['https://nexusshoop.vercel.app', 'https://nexusshop.vercel.app', 'http://localhost:3000'];
const win = new Map(); const day = new Map();
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  const origin = req.headers.origin || '';
  if (origin && !ALLOWED.some(a => origin.startsWith(a))) return res.status(403).json({ ok: false, error: 'origin' });
  const ip = (req.headers['x-forwarded-for'] || 'local').split(',')[0].trim();
  const mk = ip + '|' + Math.floor(Date.now() / 60000);
  const dk = ip + '|' + new Date().toISOString().slice(0, 10);
  const m = (win.get(mk) || 0) + 1; win.set(mk, m);
  const d = (day.get(dk) || 0) + 1; day.set(dk, d);
  if (m > 8)  return res.status(429).json({ ok: false, error: 'rate_minute' });
  if (d > 60) return res.status(429).json({ ok: false, error: 'rate_day' });
  const key = process.env.GEMINI_KEY;
  if (!key) return res.status(500).json({ ok: false, error: 'no_key' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const payload = body.contents ? body : { contents: [{ parts: [{ text: body.prompt || '' }] }] };
  const models = (process.env.GEMINI_MODEL ? [process.env.GEMINI_MODEL] : [])
    .concat(['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']);
  let last = null;
  for (const mod of models) {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + mod + ':generateContent?key=' + key, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (!r.ok) { last = { status: r.status, body: await r.json().catch(() => null) }; continue; }
    const j = await r.json();
    const parts = (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) || [];
    const text = parts.map(p => p.text || '').join('');
    if (text) return res.status(200).json({ ok: true, text, model: mod });
    last = { status: 200, body: j };
  }
  const msg = last && last.body && last.body.error ? last.body.error.message : JSON.stringify(last).slice(0, 200);
  return res.status(502).json({ ok: false, error: 'gemini', detail: msg });
}
