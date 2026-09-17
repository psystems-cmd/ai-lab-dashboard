# ACME AI Lab

A dashboard for collecting, scoring and ordering a company's AI use cases. It is a plain HTML/CSS/JS page with no build step and no backend. "ACME" is a placeholder brand.

## Run

```sh
python3 -m http.server 8080   # then open http://localhost:8080
```

## Theory

Most AI ideas die in one of two ways: they never get written down properly, or they get built in the wrong order. The dashboard deals with both.

1. **Capture every idea in the same shape.** Each use case has a pain point, a description, a user story, benchmarks and success metrics. This makes ideas comparable and forces the question "how would we know it worked?" before anything gets built.
2. **Score on two axes only.** *Impact* measures business value and *effort* measures the time, skill and resources needed. Each is scored from 1 to 5. Two coarse scores are quick to agree on in a meeting, and they are enough to rank ideas.
3. **Build in matrix order.** This is the classic impact/effort 2×2:

   | | Low effort | High effort |
   |---|---|---|
   | **High impact** | **Quick Wins**: build first | **Strategic Bets**: plan deliberately |
   | **Low impact** | **Maybe Later**: park | **Avoid**: drop |

## Logic

- **Types** describe the delivery format, from least to most product-like:
  - *Automation* is a background workflow, for example in n8n.
  - *Microapp* is a narrow, single-purpose tool.
  - *SLC App* is a small product that is Simple, Lovable and Complete.
- **Statuses** form a pipeline: `idea → exploring → prototyping → live`. The overview totals them as Ideas, In Progress (exploring + prototyping) and Live.
- **Matrix position:** effort sets the x-axis (right = harder) and impact sets the y-axis (top = more valuable). A score of 3 sits on a dividing line, so it shows a borderline case.
- **Storage:** data is kept in the browser's `localStorage` under `acme-ai-lab-v1`. It stays on one device and one browser, and three example use cases load on first visit.
- **Import:** a use case can be pasted in as Markdown with a small header block (YAML frontmatter). The **Add Use Case** form shows the format.

## Files

| File | Role |
|---|---|
| `index.html` | Layout and the three views (Overview, Use Cases, Priority Matrix) |
| `app.js` | Example data, storage, rendering, forms, Markdown import |
| `style.css` | Monochrome theme. Colours are variables in `:root` |

## Rebranding

To rebrand, change the `:root` variables in `style.css` and the dot colours in `DOT_COLOR` in `app.js`. Then replace "ACME" in `index.html` and `favicon.svg`, and rename the storage key.
