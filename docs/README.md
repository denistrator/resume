# Project documentation

This is the project-specific documentation for Denis Belevtsov's resume site.
It describes the checked-in implementation, including customizations to TARS 1.15.1.

| Document | Purpose |
| --- | --- |
| [Architecture](architecture.md) | Source boundaries, rendering, build pipeline, styling and browser behavior |
| [Development](development.md) | Setup, editing workflows, build verification and troubleshooting |
| [Localization](i18n-pattern.md) | Translation data, Handlebars rendering and runtime switching |
| [Operations and limitations](operations.md) | Deployment, repository checks and known maintenance risks |
| [Agent instructions](../AGENTS.md) | Concise rules for automated contributors |

`en/` and `ru/` contain bundled upstream TARS reference documentation. Use them for builder
concepts, then check current task/configuration files for project behavior.
The root [README.md](../README.md) and [README_RU.md](../README_RU.md) provide matching
English and Russian project overviews and quick-start instructions.

The analysis behind these documents reviewed application templates, component data and scripts,
SCSS composition, asset handling, build tasks, watchers, configuration, dependency declarations,
and deployment configuration. It is a source and build review, not a browser compatibility or
security audit. See [operations](operations.md) for limitations discovered during that review.
