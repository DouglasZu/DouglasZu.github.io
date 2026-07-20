# Public QA project playbook

The account currently has one public repository. The fastest path to a stronger recruiter signal is to publish three focused, executable case studies—not to manufacture four cards that all point to the same profile page.

## Recommended repository portfolio

| Repository | Recruiter signal | Suggested topics |
| --- | --- | --- |
| `playwright-quality-lab` | Modern E2E architecture, reliability and CI evidence | `playwright`, `typescript`, `e2e-testing`, `test-automation`, `github-actions`, `quality-engineering` |
| `api-contract-testing-lab` | API strategy, schemas, negative paths and data handling | `api-testing`, `contract-testing`, `postman`, `newman`, `rest-api`, `quality-engineering` |
| `performance-testing-lab` | Workload modeling, thresholds and analysis | `k6`, `performance-testing`, `load-testing`, `observability`, `grafana` |
| `DouglasZu.github.io` | Communication, personal brand and frontend craft | `portfolio`, `quality-assurance`, `test-automation`, `github-pages` |

## 1. Playwright Quality Lab

**Problem:** prove a maintainable web test strategy beyond basic happy-path scripts.

**Core stack:** TypeScript, Playwright, GitHub Actions, Docker only if it makes local/CI parity materially better.

**Minimum evidence:**

- critical-path, negative and accessibility checks;
- fixtures and isolated test data;
- trace, screenshot and HTML-report artifacts on failure;
- sharding or parallel execution with a documented trade-off;
- retry policy that does not hide flakiness;
- architecture diagram and test-scope matrix.

**Visual assets:** 1200×630 repository cover, one report screenshot, one 10–20 second failure-trace demo. Prefer compressed WebP/video links; use GIF only when the final file remains lightweight.

**Differentiator:** a “Reliability decisions” section explaining selectors, waiting, isolation, retries and quarantine.

**Challenge/learning prompts:** What caused flakes? What signal justified automation? What was kept manual and why?

## 2. API Contract Testing Lab

**Problem:** demonstrate that API quality means more than checking status `200`.

**Core stack:** Postman/Newman or Playwright API, JSON Schema/OpenAPI, a disposable test service and GitHub Actions.

**Minimum evidence:**

- auth and authorization matrix;
- schema, boundary, invalid-data and idempotency cases;
- deterministic data setup/cleanup;
- environment handling with no committed secrets;
- CI report and failing-contract example;
- sequence diagram for client, API and data store.

**Differentiator:** an explicit risk table mapping failure modes to tests and monitoring.

## 3. Performance Testing Lab

**Problem:** show the reasoning behind a workload, not only a k6 script.

**Core stack:** k6, Docker Compose when needed, GitHub Actions for smoke performance only, and exported results.

**Minimum evidence:**

- baseline, ramp, spike and stress scenarios;
- SLO-derived thresholds;
- reproducible test data and environment notes;
- p50/p95/p99, error rate and throughput analysis;
- clear warning that CI runners are unsuitable for absolute benchmarking;
- findings with bottleneck hypotheses and next experiments.

**Differentiator:** a before/after result is used only when environment, date and method are recorded.

## README anatomy for every case study

1. One-line problem and outcome
2. Demo/report link
3. Test scope and risk model
4. Architecture diagram
5. Quick start in three to five commands
6. Test commands by suite
7. CI and artifacts
8. Design decisions and trade-offs
9. Known limitations
10. What was learned

Use [`templates/project-repository/README.md`](../templates/project-repository/README.md) as the starting point.

## GitHub features with a job to do

- **About and topics:** make the repository discoverable and understandable before opening the README.
- **Actions:** run lint, tests and report upload on pull requests.
- **Releases:** version meaningful project milestones and attach stable reports or demos.
- **Pages:** host test reports or documentation when public exposure is safe.
- **Issues:** record bugs, improvements and test debt with templates.
- **Pull request template:** force scope, evidence, risk and test notes into review.
- **Discussions/Wiki:** enable only if the project attracts a real community; empty features look unfinished.
