# GitHub profile audit — July 2026

## Baseline scorecard

| Criterion | Score | Main finding |
| --- | ---: | --- |
| Organization | 5.5/10 | CSS and JavaScript are separated, but the profile content and portfolio concerns are mixed conceptually. |
| README | 3.0/10 | The existing README explains GitHub Pages deployment; it is not a recruiter-facing Profile README. |
| Layout | 7.0/10 | The portfolio has a clear hero and section rhythm, but its presentation is denser than a five-second recruiter scan. |
| UX | 6.0/10 | Responsive navigation, theme and language controls help; accessibility semantics and reduced-motion support need work. |
| Visual identity | 6.5/10 | Consistent tokens and dark mode exist, but cyan/purple particles feel generic rather than ownable. |
| Technologies | 4.5/10 | The site lists many tools, while the public account currently has little code that proves their use. |
| Projects | 1.5/10 | Four project cards all lead to the account page, not to repositories, code or reports. |
| Professionalism | 4.0/10 | The experience story is useful, but unsupported numbers and placeholder-style artifacts weaken trust. |
| Personal branding | 5.0/10 | “I break things before users do” is memorable but common; the support-to-QA feedback-loop story is more distinctive. |
| GitHub/web SEO | 4.5/10 | Basic metadata exists; repository topics, profile bio, canonical/social assets and project descriptions are incomplete. |
| ATS friendliness | 3.0/10 | Relevant keywords exist in the website, but not in a concise, crawlable profile summary backed by repositories. |
| Recruiter readiness | 3.5/10 | Contact is visible, but the public profile currently exposes one repository and no dedicated Profile README. |

## What changes the first ten seconds

The new profile leads with role, outcome and contact. The next viewport answers three recruiter questions in order:

1. **What does Douglas do?** Quality Assurance Engineering across web, API and automation.
2. **How does he work?** Risk-based strategy, maintainable automation and CI/CD feedback.
3. **Where is the proof?** Direct links to public work, experience and automatically generated public metrics.

This mirrors modern product pages from Vercel, Linear, Stripe and Apple at the principle level: strong hierarchy, generous spacing, restrained color and progressive disclosure. No brand assets or layouts are copied.

## Design decisions

- **One premium hero, not a badge wall.** Local SVGs provide a cohesive identity with fewer network dependencies.
- **English first.** The target is international recruitment; Portuguese can live in the portfolio's language switcher.
- **Progressive disclosure.** Secondary tools, earlier roles and contribution animation sit inside `<details>` blocks.
- **Evidence over decoration.** Trophies, visitor counters, streak cards and duplicate graphs are omitted because they add little hiring signal.
- **Honest capability levels.** Tools requested in the brief but not supported by public artifacts appear under “Growing next,” not as proven expertise.
- **Motion as enhancement.** The typing asset is readable when animation is unavailable and stops changing when reduced motion is preferred.
- **Platform-compatible styling.** GitHub strips custom page CSS and JavaScript from README content, so styling lives in versioned SVG assets.

## Repository-level improvement backlog

For `DouglasZu.github.io`:

1. Add skip link, semantic `<main>`, `:focus-visible`, semantic mobile-menu button and ARIA-complete tabs.
2. Respect `prefers-reduced-motion` and pause canvas animation when the page is hidden.
3. Replace branch-based third-party icon URLs with versioned local assets.
4. Add canonical URL, Open Graph image, Twitter card, favicon, `robots.txt`, `sitemap.xml` and structured data.
5. Add a quality workflow for HTML, CSS, JavaScript and link validation.
6. Either add the stated MIT license or remove the license claim.
7. Mark sample QA artifacts as samples and remove unsupported numerical outcomes.

For future QA repositories:

1. Keep the root shallow: `tests/`, `fixtures/`, `pages/` or `clients/`, `docs/`, `.github/workflows/`.
2. Include a reproducible quick start, test matrix, architecture diagram and troubleshooting section.
3. Upload HTML reports, traces, screenshots and performance results as CI artifacts.
4. Add issue/PR templates, releases and topics only when they serve the repository.
5. Use GitHub Pages for reports or documentation, not as decoration.

## Résumé alignment update

The supplied résumé resolved several baseline uncertainties:

- five years of QA experience;
- Playwright, Selenium, Postman, TypeScript, Python, SQL, Git, Jira and CI/CD experience;
- manual, API, interface, integration and regression testing;
- Scrum, Kanban and acceptance-criteria collaboration;
- Technology degree in Systems Analysis and Development at Fatec Sorocaba, completed in 2020;
- intermediate English;
- current LinkedIn slug: `douglaszulim`.

The phone number remains private and is intentionally excluded from the public GitHub profile. Numerical impact claims, certifications, articles and the four unlinked QA project cards remain unverified.
