# Phase 02 — Reference Study and Integration Decision

## Status

**Completed:** 2026-08-24

## Sources inspected

The following repositories were cloned into an isolated research directory and inspected without copying source code into the product repository.

| Project | Pinned commit | License | Decision-relevant finding |
| --- | --- | --- | --- |
| [OpenCode][1] | `03bba464d46f3eddf74195919b1344aa937f7b11` | MIT | A large TypeScript/Bun monorepo with agent, session, tool, provider, permission, skill, MCP, SDK, server, and desktop boundaries. |
| [Presenton][2] | `51396e23df194cab70ecd91a45495931bb8e9825` | Apache-2.0 | A composed presentation system whose desktop path combines Electron with the shared FastAPI backend and Next.js UI; it already covers prompt/document generation, templates, editing, and PPTX/PDF export. |
| [Starry Slides / StarryKit][3] | `5fd5b103572cc78c4f636ad8d8f534dbe62fb591` | MIT | The current public repository is primarily a plugin, skill, documentation, and hosted-MCP integration bundle. It is not a self-contained local slide-authoring backend. |

## Architecture decision

Osamah Agent will be an independent desktop shell and product experience. It will not vendor or blindly merge any of the three repositories. Instead, it will expose stable local contracts and adapters:

| Boundary | Adopt | Do not adopt blindly |
| --- | --- | --- |
| Agent Core | OpenCode’s concepts for sessions, tools, permissions, providers, skills, MCP, and context epochs. | OpenCode’s full monorepo, Bun-specific runtime assumptions, or UI package hierarchy. |
| Presentation Engine | Presenton’s product-level capability map and API-oriented separation between generation, editing, templates, and export. | Presenton’s full Electron/FastAPI/Next.js build stack until the application proves it needs that runtime footprint. |
| Editable slide model | Presenton’s JSON-driven slide contract, shared preview/export path, stable element identity, selection, undo/redo, and typed element editing as design references. | Direct source copying before a file-level license and dependency audit. |
| Agent presentation workflow | StarryKit’s separation of content, design brief, bounded edit, preview, and export; its emphasis on editable output and deliberate visual QA. | Hosted StarryKit MCP credentials, private agents, or any assumption that the public plugin contains the remote authoring service. |
| Skills | A local discovery layer supporting `.opencode/skills/`, `.claude/skills/`, and `.agents/skills/`, with permission-checked body loading. | Treating skill descriptions as executable authority or exposing full skill bodies before authorization. |

## Runtime decision

The initial product will use a lightweight TypeScript desktop-ready shell with a modular core. The first vertical slice will keep the agent and presentation interfaces behind local interfaces so an embedded OpenCode process or Presenton service can be added later without coupling the UI to either project’s runtime. This avoids pulling in Presenton’s Python, Next.js, Electron-builder, export runtime, and image-processing footprint before the product needs those components.

The application must remain local-first and provider-neutral. Provider configuration will be represented as data and passed through an adapter boundary; no provider key will be committed to the repository. Sensitive actions such as deleting slides, deleting files, running dangerous commands, Git operations, or overwriting exports remain approval-gated in the product contract.

## Important compatibility finding

Presenton’s editor documentation describes one slide model rendered both to an editable Konva surface and to HTML preview/export, with a central commit path feeding undo/redo and durable presentation state. Osamah Agent will follow the same principle in its own contract: one canonical slide document, separate renderers, stable element IDs, and a single change pipeline that can record whether a change came from the agent or from a human.

StarryKit’s repository and test suite show a hosted MCP endpoint without embedded credentials and a skill that separates source evidence, content, design intent, bounded edits, preview, and export. Osamah Agent will implement these as local workflow concepts and keep any future remote connector optional and explicitly configured.

## License boundary

The project will ship `THIRD_PARTY_NOTICES.md` with the source URLs, pinned commits, licenses, and intended use. No third-party source files have been copied into this phase. If code is later reused, the exact files and modifications will be added to that notice and the compatible license text will be retained.

## Next phase

Define the modular repository structure, canonical domain contracts, shared design tokens, stage-level test gates, and the first functional vertical slice for Development and Presentations.

## References

[1]: https://github.com/anomalyco/opencode "OpenCode repository"
[2]: https://github.com/presenton/presenton "Presenton repository"
[3]: https://github.com/StarryKit/starry-slides "StarryKit / Starry Slides repository"
