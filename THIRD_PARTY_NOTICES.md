# Third-Party Notices

This file records the external projects studied for Osamah Agent. The listed repositories were inspected as references; no source files from them are vendored by the current commit.

| Project | Source URL | Pinned commit | License | Intended use in Osamah Agent | Current modification status |
| --- | --- | --- | --- | --- | --- |
| OpenCode | https://github.com/anomalyco/opencode | `03bba464d46f3eddf74195919b1344aa937f7b11` | MIT | Reference and future adapter boundary for agent sessions, tools, providers, permissions, skills, MCP, and context. | No source copied. |
| Presenton | https://github.com/presenton/presenton | `51396e23df194cab70ecd91a45495931bb8e9825` | Apache-2.0 | Reference and future adapter boundary for presentation generation, templates, editable slide data, and PPTX/PDF export. | No source copied. |
| Starry Slides / StarryKit | https://github.com/StarryKit/starry-slides | `5fd5b103572cc78c4f636ad8d8f534dbe62fb591` | MIT | Reference for skill-driven visual authoring, design briefs, editable outputs, review, and optional hosted-MCP integration. | No source copied; no credentials embedded. |

## License handling rule

Before copying or adapting any implementation file, record the file path, source commit, license, copyright notice requirements, and local modifications here. Preserve compatible license and notice text in the distribution. Dependencies introduced later must be recorded with their package version and license as part of the dependency lockfile review.

## Source license files

The inspected source repositories each contain a root license file. Presenton also contains a `NOTICE` file covering third-party packages. Those files remain in the isolated research checkouts and have not been reproduced here because the current product does not redistribute their source code.
