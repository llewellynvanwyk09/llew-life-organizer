import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const KEY = 'calorieData';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = (await redis.get(KEY)) || { target: 2000, maintenance: 2000, food: [], burn: [] };
      if (typeof data.maintenance !== 'number' || data.maintenance <= 0) {
        data.maintenance = typeof data.target === 'number' ? data.target : 2000;
      }
      res.status(200).json(data);
      return;
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const target = typeof body?.target === 'number' && body.target > 0 ? body.target : 2000;
      const maintenance = typeof body?.maintenance === 'number' && body.maintenance > 0 ? body.maintenance : target;
      const food = Array.isArray(body?.food) ? body.food : [];
      const burn = Array.isArray(body?.burn) ? body.burn : [];
      await redis.set(KEY, { target, maintenance, food, burn });
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown server error' });
  }
}
