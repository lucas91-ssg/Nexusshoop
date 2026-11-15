// NexusShop — Raahnuma proxy (Vercel serverless)
// Fix de auditoría (Ayesha, punto 1): origen permitido + rate-limit por IP + clave SOLO en env.
const ALLOWED = ['https://nexusshoop.vercel.app', 'https://nexusshop.vercel.app', 'http://localhost:3000'];
const win = new Map(); // ip|minuto -> n
const day = new Map(); // ip|fecha -> n
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
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const payload = body.contents ? body : { contents: [{ parts: [{ text: body.prompt || '' }] }] };
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    const j = await r.json();
    return res.status(200).json({ ok: true, text: (j.candidates && j.candidates[0] && j.candidates[0].content.parts[0].text) || '' });
  } catch (e) { return res.status(502).json({ ok: false, error: 'upstream' }); }
}
