import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const read = (relative) => readFileSync(resolve(root, relative), 'utf8');


test('Development route mounts the original Async app', () => {
  const shell = read('integrations/async/src/OsamahApp.tsx');
  assert.match(shell, /import AsyncOriginalApp from ['"]\.\/App['"]/);
  assert.match(shell, /data-original-source=['"]Async['"]/);
  assert.equal(existsSync(resolve(root, 'integrations/async/src/EditorMainPanel.tsx')), true);
  assert.equal(existsSync(resolve(root, 'integrations/async/main-src/terminalSessionService.ts')), true);
  assert.equal(existsSync(resolve(root, 'integrations/async/main-src/gitService.ts')), true);
});

test('Presentations route points to the original Presenton route', () => {
  const shell = read('integrations/async/src/OsamahApp.tsx');
  assert.match(shell, /new URL\(['"]\/presentation['"], PRESENTON_URL\)/);
  assert.match(shell, /data-original-source=['"]Presenton['"]/);
  assert.equal(existsSync(resolve(root, 'integrations/presenton/servers/nextjs/components/slide-editor/surface/TemplateV2KonvaSlide.tsx')), true);
  assert.equal(existsSync(resolve(root, 'integrations/presenton/servers/nextjs/lib/template-v2-json-to-html.ts')), true);
});

test('OpenCode is wired as an adapter/core service, not as the Development UI', () => {
  const bridge = read('integrations/async/main-src/opencodeCoreBridge.ts');
  const registration = read('integrations/async/main-src/ipc/register.ts');
  assert.match(bridge, /src\/index\.ts.*serve/);
  assert.match(bridge, /session.*prompt/);
  assert.match(registration, /registerOpenCodeCoreIpc/);
  assert.equal(existsSync(resolve(root, 'integrations/opencode/packages/core/src/session/execution.ts')), true);
});

test('No transitional root mock engines remain', () => {
  for (const relative of ['src/App.tsx', 'src/core.ts', 'src/types.ts', 'src/styles.css', 'tests/core.test.ts']) {
    assert.equal(existsSync(resolve(root, relative)), false, `${relative} must not return`);
  }
});
