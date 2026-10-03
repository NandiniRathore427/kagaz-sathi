# Kagaz Saathi

Take a photo of any official paper (bill, notice, letter) and get a plain-English explanation:
what it is, how much, the deadline, and what to do next.

## Run / deploy
1. Get a free key at https://aistudio.google.com (Get API key).
2. Push this folder to GitHub.
3. On https://vercel.com: Add New > Project > import the repo.
4. Settings > Environment Variables: add `GEMINI_API_KEY` = your key. Redeploy.

## Structure
- `index.html`, `style.css`, `script.js` : frontend
- `api/explain.js` : serverless backend (keeps the API key secret)

MIT License
