# The Ultimate Algo Trading Handbook

[![PWA Status](https://img.shields.io/badge/PWA-Installable-cyan.svg)](https://handbook.algo.quant/index.html)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-98%2B-green.svg)](https://handbook.algo.quant/index.html)
[![Author](https://img.shields.io/badge/Author-Aryan%20Jayanth-purple.svg)](https://github.com/aryanjayanth)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A premium, production-grade reference manual for quantitative finance, algorithmic strategy design, and risk management. Designed with a modern, flat dark-first SaaS aesthetic.

🌐 **Live Website**: [The Ultimate Algo Trading Handbook](https://handbook.algo.quant/index.html)

---

## Key Features

### 📖 The Reference Handbook
* **11 In-depth Sections**: Covers market inefficiency hypotheses, proper backtesting practices, indicator mathematics, signal engineering, and risk management logic.
* **Vectorized Python Snippets**: Ready-to-copy code blocks for computing indicators (wilder-smoothed RSI, ATR, MACD, Bollinger Bands) and evaluating statistical cointegration.
* **Interactive Reading Utilities**: Scroll progress trackers, estimated reading times, and section completion checklists stored locally in the browser.
* **Ctrl+K Instant Search**: Fast, client-side indexing and keyword-matching search engine with marked content highlights.

### 🧮 Interactive Quant Calculators
Self-contained, interactive calculation cards to help trade planners size risk:
* **Sharpe Ratio Calculator**: Standardizes returns against volatility levels.
* **CAGR Calculator**: Computes compound growth trajectories, drawing dynamic comparison SVG curves against linear paths.
* **Kelly Criterion Calculator**: Maximizes compounded growth boundaries, highlighting sizing advice and risk of ruin alerts.
* **Position Size Calculator**: Sizes position exposure and leverage multiples based on account metrics and stop distances.
* **Drawdown Calculator**: Computes the compounding hurdle rate required to recover from valley levels back to previous peaks.

---

## Tech Stack & Architecture

To achieve sub-second load times and high performance (Lighthouse >95), this project is built entirely on a client-side vanilla stack:
* **Structure**: Semantic HTML5 markup.
* **Styling**: Vanilla CSS3 design system using HSL color tokens, solid borders, and CSS hardware-accelerated animations. No Tailwind dependency.
* **Logic**: Vanilla ES6 modules (core navigation, search indices, calculators).
* **Highlighting**: [Prism.js](https://prismjs.com/) for Python code styling.
* **Offline PWA Capabilities**: Standalone manifest (`manifest.json`) and service worker cache-manager (`pwa/sw.js`).

---

## Installation & Local Run

No build step or Node server configuration is required. Simply clone the repository and open the index page:

```bash
# Clone the repository
git clone https://github.com/aryanjayanth/algo-trading-handbook.git

# Navigate into the project folder
cd algo-trading-handbook

# Run a local development server (optional but recommended for service workers)
npx serve .
```

---

## Project Folder Structure

```
/
├── index.html                  # Main landing page & handbook reader
├── README.md                   # Repository landing page
├── manifest.json               # PWA App Manifest
├── robots.txt                  # SEO search indexing rules
├── sitemap.xml                 # SEO sitemap
│
├── assets/
│   ├── css/
│   │   ├── variables.css       # Theme tokens (colors, animations)
│   │   ├── layout.css          # Page grid, header, sidebar side drawers
│   │   ├── components.css      # Styled inputs, cards, search overlay
│   │   └── handbook.css        # Reading panels, checklist indicators, flowchart nodes
│   │
│   ├── js/
│   │   ├── core.js             # Theme controllers, TOC link observers, menu drawer toggles
│   │   ├── search.js           # Document indexing, text highlighter
│   │   └── pwa-register.js     # PWA registration
│   │
│   └── icons/
│       ├── icon-192.png        # PWA Icon
│       └── icon-512.png        # PWA Icon
│
├── calculators/
│   ├── sharpe.html             # Interactive Sharpe Ratio calculator
│   ├── cagr.html               # Interactive CAGR calculator
│   ├── kelly.html              # Kelly Criterion calculator
│   ├── position-size.html      # Position Size calculator
│   └── drawdown.html           # Drawdown calculator
│
└── pwa/
    └── sw.js                   # Service worker caching engine
```

---

## Roadmap

- [ ] **v1.1**: Add Pine Script to Python automated translation compiler widgets.
- [ ] **v1.2**: Add Portfolio optimization models using Modern Portfolio Theory (MPT) calculations.

---

## Contributing

Contributions are welcome. Please open an issue first to align on proposed revisions before submitting Pull Requests.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewAlphaSignal`).
3. Commit your changes (`git commit -m 'Add support for Chandelier stops'`).
4. Push to the Branch (`git push origin feature/NewAlphaSignal`).
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more details.

---

## Disclaimer

All materials and tools provided in this handbook are strictly for educational purposes. Algorithmic trading involves substantial financial risk. Past backtested performance is not indicative of live trading results.
