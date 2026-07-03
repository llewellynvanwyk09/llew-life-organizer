import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const KEY = 'tasks';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const tasks = (await redis.get(KEY)) || [];
      res.status(200).json({ tasks });
      return;
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const tasks = Array.isArray(body?.tasks) ? body.tasks : [];
      await redis.set(KEY, tasks);
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown server error' });
  }
}
