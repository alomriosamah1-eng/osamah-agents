# Osamah Agent Workflow

## Purpose

This document governs the implementation of **Osamah Agent** and is part of the repository history. It is updated after every implementation stage so that the repository always records what was examined, changed, validated, and committed.

## Stage gate

Every stage follows the same sequence:

1. Inspect the current state and write down the intended boundary.
2. Make the smallest coherent change that advances the product.
3. Run the available lint, typecheck, unit, integration, and build checks. If a check is not yet available, record that fact explicitly rather than presenting it as passed.
4. Update the corresponding `docs/phase-reports/phase-NN-*.md` report and any affected architecture or licensing records.
5. Review `git diff`, `git status`, and the branch name. Do not force-push, delete the remote, or discard unrelated work.
6. Commit the complete stage, including its documentation.
7. Push the commit to `origin/main` unless a dedicated feature branch is required for safety. Record the commit SHA and the remote verification result in the phase report.

## Documentation invariant

A stage is not complete until its phase report is committed and pushed. Reports must distinguish between **implemented**, **verified**, **not yet implemented**, and **blocked** items. External projects must be cited with their URL, pinned commit, license, relevant components, and any local modifications.

## Safety invariant

Before a destructive or wide-ranging change, create a backup branch or tag, inspect the diff, and retain existing functionality unless it is demonstrably duplicated or incompatible. Sensitive operations in the product itself require explicit human approval in the user interface.

## GitHub policy

The canonical remote is:

`git@github.com:alomriosamah1-eng/osamah-agents.git`

The working remote may be represented by GitHub CLI as the equivalent HTTPS URL. No force push is permitted. Each completed stage must leave a reproducible commit on GitHub, and the final response must include the published commit history and validation summary.

## Initial implementation strategy

The repository is currently empty. The first product increment will therefore establish a modular desktop-ready foundation and a real, testable vertical slice rather than a static mockup. Third-party engines will be integrated behind adapters only after their source and license boundaries are recorded.
