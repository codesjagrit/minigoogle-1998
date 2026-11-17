# MiniGoogle 1998 — A PageRank-Based Search Engine

> A classroom project demonstrating the fundamental difference between traditional keyword-based search ranking and Google's PageRank algorithm.

![MiniGoogle 1998 Preview](https://img.shields.io/badge/Algorithm-PageRank-4285F4?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-34A853?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_TypeScript_|_Tailwind-EA4335?style=for-the-badge)

---

## 🌟 Overview

Before 1998, search engines like AltaVista and Lycos ranked pages primarily by **keyword frequency** (how many times a search term appeared in the URL, title, and body). This made search vulnerable to **keyword stuffing** and spam farms.

In 1998, Larry Page and Sergey Brin at Stanford University introduced **PageRank** — an algorithm that models the web as a directed graph where hyperlinks act as **votes of confidence**, with links from authoritative sites carrying exponentially greater weight.

**MiniGoogle 1998** brings this concept to life with an interactive comparison search engine, real iterative PageRank calculations, interactive link topology graph, and heuristic spam detection.

---

## 🚀 Key Features

- **Dual-Mode Visual Identity:**
  - **1998 Classic Google Edition:** Authentic Stanford 1998 aesthetic with multi-color serif logo and retro search controls.
  - **Cyber Lab Edition:** Futuristic dark intelligence laboratory mode with neon glowing metrics.
- **Real Mathematical PageRank Algorithm:**
  - Damping factor $d = 0.85$
  - Initial score distribution $PR_0 = \frac{1}{N}$
  - Convergence threshold $\epsilon < 10^{-6}$
  - Uniform probability redistribution for dangling nodes
- **Analytical Comparison Dashboard:**
  - **Method 01 (Traditional Keyword Search):** Ranks by raw keyword count in URL, title, and body.
  - **Method 02 (Google PageRank):** Ranks by $70\% \text{ Normalized Keyword} + 30\% \text{ Normalized PageRank}$.
- **Interactive Hyperlink Topology Graph:**
  - Draggable nodes with radius proportional to PageRank authority.
  - Glowing directed link arrows.
  - Hover highlights for inbound votes (blue) and outbound votes (green).
  - Zoom and pan controls.
- **Transparent Keyword Spam Scanner:**
  - Heuristic detection ($\ge 5$ occurrences, $> 25\%$ density, 0 inbound links).
  - Flags spam pages like `pizza-pizza-pizza.com`.
  - One-click removal from active index with instant PageRank recalculation.
- **Node Inspector (Page Explorer):**
  - Terminal-style inspection panel displaying raw text, inbound/outbound links, density, and score formulas.

---

## 📊 Dataset (Exact 6 Web Pages)

| Page | URL | Description / Snippet | Outgoing Links |
|:---:|---|---|:---:|
| 1 | `pune-food-guide.com` | Where to eat in Pune - vada pav and biryani and pizza | 2 |
| 2 | `best-pizza-pune.com` | Fresh wood-fired pizza made daily - try our cheese pizza | 1, 3 |
| 3 | `college-canteen-blog.com` | Student reviews of canteen food and chai and Friday pizza | 2, 4 |
| 4 | `pizza-recipes-home.com` | Make pizza at home - pizza dough and pizza sauce | 2, 5 |
| 5 | `cheap-eats-pune.com` | Good food under 100 rupees - misal and dosa and pizza slices | 2 |
| 6 | `pizza-pizza-pizza.com` | pizza pizza pizza pizza pizza pizza pizza pizza pizza pizza (Spam) | 1 |

---

## 🛠️ Setup & Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 📜 PageRank Formula

$$PR(A) = \frac{1-d}{N} + d \sum_{T \in \text{In-links}(A)} \frac{PR(T)}{C(T)}$$

Where:
- $PR(A)$ = PageRank of page $A$
- $d = 0.85$ (damping factor)
- $N$ = Total active pages
- $T$ = Pages linking to $A$
- $C(T)$ = Outgoing link count of $T$
