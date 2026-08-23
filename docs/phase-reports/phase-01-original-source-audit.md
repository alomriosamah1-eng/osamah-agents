# Phase 01 — Original Source Audit

## Status

**Completed:** 2026-08-24

## Requirement correction

The latest specification changes the source-of-truth assignment. **Async IDE** is now the original Development UI and engine. **Presenton** remains the original Presentation UI and engine. **Starry Slides/StarryKit** is an additional visual-authoring and WYSIWYG source where compatible. **OpenCode** is the Agent Core only and must not replace Async as the Development UI.

## Reference checkout findings

| Source | Pinned commit | License | Approximate source size excluding dependencies | Role |
| --- | --- | --- | --- | --- |
| [Async IDE][1] | `2c18a43c0711d1f991a6eabd913831f9c82794b0` | Apache-2.0 | 18 MB / 675 tracked files | Original Development interface and Electron/native engine. |
| [Presenton][2] | `51396e23df194cab70ecd91a45495931bb8e9825` | Apache-2.0 | 217 MB / 10,330 tracked files | Original Presentation interface, FastAPI/Next.js engine, editable slide editor, and export pipeline. |
| [Starry Slides][3] | `5fd5b103572cc78c4f636ad8d8f534dbe62fb591` | MIT | 7.1 MB / 65 tracked files | Skill, visual-authoring workflow, and hosted MCP contract; not a self-contained local authoring backend in the inspected branch. |
| [OpenCode][4] | `03bba464d46f3eddf74195919b1344aa937f7b11` | MIT | 144 MB / 6,523 tracked files | Agent Core for sessions, tools, skills, MCP, context, permissions, models, and providers. |

## Source mapping decision

The exact original component owners are recorded in [`UI_SOURCE_MAP.md`](../../UI_SOURCE_MAP.md). The implementation must bring the original source into the product workspace through a reproducible vendoring or workspace strategy, preserve the original engine/runtime boundaries, and record every copied or adapted file in [`THIRD_PARTY_INTEGRATIONS.md`](../../THIRD_PARTY_INTEGRATIONS.md).

The current product-owned React/Vite surface is not accepted as a substitute for Async or Presenton. It is transitional and must be retired, replaced by source-backed routes, or retained only as the Osamah shell and missing integration layer.

## License correction

Async’s inspected root `LICENSE` is Apache-2.0, not MIT. The project documentation has been corrected before source integration proceeds. Presenton is also Apache-2.0, while Starry Slides and OpenCode are MIT. License and notice obligations must be preserved when files are copied into the repository.

## Next phase

Create the source-backed monorepo layout and bring the original Async UI/runtime into an explicit Development integration boundary without recreating its editor, terminal, Git, Explorer, agent panel, or native services.

## References

[1]: https://github.com/ZYKJShadow/Async "Async IDE repository"
[2]: https://github.com/presenton/presenton "Presenton repository"
[3]: https://github.com/StarryKit/starry-slides "Starry Slides / StarryKit repository"
[4]: https://github.com/anomalyco/opencode "OpenCode repository"
