import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const KEY = 'exerciseLogs';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const logs = (await redis.get(KEY)) || [];
      res.status(200).json({ logs });
      return;
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const logs = Array.isArray(body?.logs) ? body.logs : [];
      await redis.set(KEY, logs);
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown server error' });
  }
}
