# Third-Party Integrations

## Source-of-truth roles

| Project | Repository | Pinned commit | License | Role in Osamah Agent | Redistribution rule |
| --- | --- | --- | --- | --- | --- |
| Async IDE | https://github.com/ZYKJShadow/Async | `2c18a43c0711d1f991a6eabd913831f9c82794b0` | Apache-2.0 | Original Development UI and desktop engine: Explorer, editor, tabs, terminal, Git, search, panels, agent workflow, and native IPC. | Preserve Apache-2.0 license and identify copied/adapted files. |
| Presenton | https://github.com/presenton/presenton | `51396e23df194cab70ecd91a45495931bb8e9825` | Apache-2.0 | Original Presentation UI and engine: generation, templates, themes, editable slides, preview, PPTX, PDF, and provider support. | Preserve Apache-2.0 license and Presenton NOTICE obligations for redistributed components. |
| Starry Slides / StarryKit | https://github.com/StarryKit/starry-slides | `5fd5b103572cc78c4f636ad8d8f534dbe62fb591` | MIT | Compatible visual-authoring skill and WYSIWYG workflow layer when it can operate with Presenton. | Preserve MIT notice; never embed hosted credentials. |
| OpenCode | https://github.com/anomalyco/opencode | `03bba464d46f3eddf74195919b1344aa937f7b11` | MIT | Agent Core only: agents, subagents, tools, sessions, skills, MCP, context, permissions, models, providers, and workflows. | Preserve MIT notice and identify copied/adapted files. |

## Required per-file record before source integration

Before copying or adapting a source file, add its exact repository path, source commit, license, copyright requirement, local destination, and modification summary to this document. The source projects must remain distinguishable in the repository history and must not be silently rewritten under Osamah Agent branding.

## Connector boundary

StarryKit’s public repository describes a hosted MCP integration. Osamah Agent may add an optional connector, but no API key, access token, authorization header, or private service implementation may be committed. The connector is separate from Presenton’s local engine and must not be presented as a local Starry Slides backend.

## Current status

The first prototype commit predates this revised source-of-truth decision and contains product-owned placeholder surfaces. Those surfaces are transitional and must be replaced or retired as the original source workspaces are integrated. This is a migration requirement, not permission to keep duplicate editors or engines.
