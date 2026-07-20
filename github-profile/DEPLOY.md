# Publish this Profile README

The current repository, `DouglasZu.github.io`, is a GitHub Pages repository. GitHub only displays a Profile README from a **public repository named exactly like the account**: `DouglasZu/DouglasZu`.

## 1. Create the profile repository

1. On GitHub, create a public repository named `DouglasZu` under the `DouglasZu` account.
2. Do not add generated starter files if you intend to copy this package as-is.
3. Copy the **contents** of this `github-profile/` directory to the repository root. Do not copy the wrapping `github-profile` directory.
4. Commit and push to `main`.

Expected root structure:

```text
DouglasZu/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
├── assets/
├── docs/
├── scripts/
├── templates/
├── README.md
└── LICENSE
```

## 2. Activate generated graphics

1. Open **Actions → Profile metrics → Run workflow**.
2. Open **Actions → Contribution snake → Run workflow**.
3. Ensure **Settings → Actions → General → Workflow permissions** allows read and write permissions, or keep the explicit workflow permissions included here.
4. The metrics workflow updates `assets/metrics.svg` on `main`. The snake workflow publishes to the `output` branch.

The initial `metrics.svg` is intentionally a setup state. It is replaced with public, verifiable GitHub data after the first run.

## 3. Configure the account profile

Use a short bio such as:

> Quality Assurance Engineer · Web, API & test automation · Building reliable releases through thoughtful testing.

Then add:

- Location: `Sorocaba, Brazil`
- Website: `https://douglaszu.github.io`
- LinkedIn: `https://www.linkedin.com/in/douglaszulim/`
- Hiring status, only if it matches the current situation

## 4. Pin repositories

Pin the portfolio now. Add the QA labs only after they contain executable code and evidence:

1. `playwright-quality-lab`
2. `api-contract-testing-lab`
3. `performance-testing-lab`
4. `quality-engineering-portfolio` or `DouglasZu.github.io`
5. One meaningful open-source contribution

GitHub recommends highlighting 3–5 relevant projects. A pin should lead to code, a fast setup, a test command and a visible result.

## 5. Confirm before publishing

The profile package deliberately omits unverified claims from the current portfolio, including test-volume counts, reliability percentages and performance improvements. Confirm the checklist in [`docs/CONTENT_CHECKLIST.md`](./docs/CONTENT_CHECKLIST.md) before adding them.
