# 🌐 SocialSphere v2 — Social News, Unified

A premium, dark-mode social news aggregator that unifies trending stories across X/Twitter, Instagram, TikTok, Reddit, YouTube, Facebook, Threads and Bluesky into one addictive feed.

---

## ⚡ Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` — that's it.

---

## 🏗 Project Structure

```
src/
├── components/
│   ├── utils.ts           # Color helpers, formatters, cn()
│   ├── Toast.tsx          # Global toast notification system
│   ├── PlatformBadge.tsx  # Platform icon/colour badge
│   ├── ViralityRing.tsx   # SVG circular virality meter
│   ├── HeroCard.tsx       # Full-width top story hero
│   ├── StoryCard.tsx      # Glassmorphic story grid card
│   ├── StoryModal.tsx     # Full detail modal with all sources
│   ├── Sidebar.tsx        # Left nav: tabs, categories, platforms
│   ├── MobileSidebar.tsx  # Mobile drawer wrapper
│   ├── TopBar.tsx         # Search, sort, live indicator
│   ├── CategoryTabs.tsx   # Tab bar + category chip row
│   └── RightSidebar.tsx   # Stats, top 5, platform activity
├── data/
│   ├── platforms.ts       # Platform definitions (color, emoji, etc.)
│   └── stories.ts         # 20 base stories + 3 refresh stories
├── hooks/
│   ├── useAppState.ts     # Central state + auto-refresh logic
│   └── useTimer.ts        # Live "X seconds ago" hook
├── types/
│   └── index.ts           # All TypeScript types
├── App.tsx                # Root layout + orchestration
├── main.tsx               # React entry point
└── index.css              # Global styles + Tailwind utilities
```

---

## ✅ Features

| Feature | Status |
|---------|--------|
| 20 diverse mock stories (8 categories) | ✅ |
| Full glassmorphic card design | ✅ |
| 16:9 story thumbnails with hover zoom | ✅ |
| Hero top story with LIVE badge | ✅ |
| SVG virality ring on every card | ✅ |
| Story detail modal with all sources | ✅ |
| Per-source engagement stats + links | ✅ |
| Platform badge filtering (8 platforms) | ✅ |
| Category chip + tab filtering | ✅ |
| Real-time search (title, summary, tags) | ✅ |
| Sort by virality / engagement / latest | ✅ |
| Save to localStorage (persists) | ✅ |
| Share via Web Share API / clipboard | ✅ |
| Load more (paginated, +6 per click) | ✅ |
| Auto-refresh every 45 seconds | ✅ |
| Manual refresh button | ✅ |
| Toast notification system | ✅ |
| Live "updated X seconds ago" counter | ✅ |
| Responsive — mobile, tablet, desktop | ✅ |
| Mobile slide-out drawer menu | ✅ |
| Keyboard accessible (Escape, Enter) | ✅ |
| ARIA labels throughout | ✅ |
| PWA-ready meta tags | ✅ |

---

## 🚀 Deploying to Netlify

### Option A — CLI
```bash
npm run build
npx netlify-cli deploy --dir=dist --prod
```

### Option B — Git Integration
1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `dist`
5. Deploy

### Option C — Drag & Drop
```bash
npm run build
```
Drag the `dist/` folder into Netlify's manual deploy area.

---

## 🔌 Connecting Real APIs

Each platform has a clear integration point. Add your API clients in `src/api/`:

```typescript
// src/api/twitter.ts
// [API: X/Twitter API v2]
// Docs: https://developer.twitter.com/en/docs/twitter-api
// Auth: Bearer token, OAuth 2.0
// Key endpoint: GET /2/tweets/search/recent?query=...&sort_order=relevancy

// src/api/reddit.ts  
// [API: Reddit API]
// Docs: https://www.reddit.com/dev/api/
// Key endpoint: GET /r/{subreddit}/hot.json

// src/api/tiktok.ts
// [API: TikTok Research API]
// Docs: https://developers.tiktok.com/products/research-api

// src/api/instagram.ts
// [API: Meta Graph API]
// Docs: https://developers.facebook.com/docs/instagram-api

// src/api/youtube.ts
// [API: YouTube Data API v3]
// Docs: https://developers.google.com/youtube/v3
// Key endpoint: GET /youtube/v3/search?part=snippet&order=viewCount
```

### AI Summarisation
Replace the static `summary` field with a real AI call:

```typescript
// src/api/summarise.ts
// Using Claude API (recommended):
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function summariseStory(sources: StorySource[]): Promise<string> {
  const snippets = sources.map(s => `[${s.platform}] ${s.snippet}`).join('\n');
  const msg = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 300,
    messages: [{
      role: 'user',
      content: `Summarise these social media posts about the same event in 3-4 neutral, factual sentences:\n\n${snippets}`
    }]
  });
  return (msg.content[0] as { text: string }).text;
}
```

### Cross-Platform Story Clustering
Detect the same story across platforms using embedding similarity:

```typescript
// src/api/cluster.ts
// 1. Embed each post title/snippet with text-embedding-3-small
// 2. Compute cosine similarity between all pairs
// 3. Group posts with similarity > 0.82 into the same Story
// 4. Merge engagement stats and generate one AI summary
```

---

## 🗺 Roadmap

- [ ] Real API integrations (X, Reddit, YouTube, Instagram)
- [ ] AI summarisation via Claude API
- [ ] Embedding-based cross-platform story clustering
- [ ] User accounts + cloud-synced saved stories
- [ ] Push notifications for breaking stories
- [ ] Personalised feed based on saved story categories
- [ ] Dark/light mode toggle
- [ ] Offline PWA with service worker
