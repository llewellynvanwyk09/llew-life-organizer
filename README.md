# Llew's Life Organizer

A simple shareable to-do list with dates and times, backed by Vercel KV so it
works from any device with no login required.

## Project structure

```
llew-organizer/
├── api/
│   └── tasks.js       ← serverless function (GET/POST tasks)
├── public/
│   └── index.html     ← the app itself
├── package.json
└── .gitignore
```

## Deploy steps

### 1. Push to GitHub

1. Create a new (private is fine) repo on GitHub, e.g. `llew-life-organizer`
2. From this folder, run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/llew-life-organizer.git
   git push -u origin main
   ```

### 2. Import into Vercel

1. Go to vercel.com → **Add New → Project**
2. Select your GitHub repo
3. Framework preset: leave as **Other** (Vercel will auto-detect the `api/` folder
   and serve `public/` as static)
4. Click **Deploy** — it'll fail once, because there's no KV store attached yet.
   That's expected — continue to step 3.

### 3. Add a Redis database (Upstash, via Vercel Marketplace)

Vercel's own KV product was discontinued — it's now Upstash Redis via the Marketplace, but the setup is just as simple:

1. In your Vercel project, go to the **Storage** tab
2. Click **Browse Marketplace** (or **Connect Database**)
3. Search for **Upstash** → select **Upstash Redis**
4. Let Vercel manage the Upstash account for you (no separate signup needed)
5. **Connect** it to this project
6. This automatically adds the required environment variables — you don't need
   to set anything manually

### 4. Redeploy

1. Go to the **Deployments** tab → click the **...** menu on the latest
   deployment → **Redeploy**
2. Once it's live, open the URL Vercel gives you
   (e.g. `llew-life-organizer.vercel.app`)

### 5. (Optional) Point your own domain at it

Since you already own `tsrd.co.za`, you can add it under **Settings → Domains**
in the Vercel project and follow the DNS instructions it gives you — e.g.
`tasks.tsrd.co.za`.

## Using it

- Open the Vercel URL on your phone and PC — same tasks, no login
- Add to your phone's home screen (Share → Add to Home Screen) for an app-like icon
- Anyone with the link can view and edit the list, so don't share it publicly
