# Contributing

## Before opening a change

1. Open or reference an issue that explains the risk or problem.
2. Keep the change focused and avoid unrelated refactors.
3. Never commit credentials, customer data or production traces.

## Local quality gate

```bash
npm ci
npm run lint
npm test
```

## Pull requests

Explain the affected risk, test evidence, trade-offs and any known limitation. Attach only sanitized reports and screenshots.
