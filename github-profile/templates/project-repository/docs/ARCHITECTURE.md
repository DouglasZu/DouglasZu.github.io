# Architecture

## Context

Document the system boundary, actors, dependencies and quality risks before describing folders or frameworks.

## Test architecture

```mermaid
flowchart LR
  Runner[Test runner] --> Fixtures[Fixtures and data]
  Runner --> Client[Page or API clients]
  Client --> SUT[System under test]
  SUT --> Dependency[Controlled dependencies]
  Runner --> Evidence[Report, trace and logs]
  Evidence --> CI[CI release signal]
```

## Decisions

For each important decision, record context, choice, alternatives, trade-offs and how the decision will be revisited.

## Data and secrets

Describe creation, isolation, cleanup, redaction and secret injection. Never use production customer data.
