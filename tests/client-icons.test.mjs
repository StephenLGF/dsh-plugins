import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { runInNewContext } from 'node:vm'

// Use the same installed Harness toolchain as build-tomato-board.mjs.
const harness = resolve(process.env.DSH_HARNESS_ROOT || new URL('../../deepseek-harness/', import.meta.url).pathname)
const require = createRequire(resolve(harness, 'packages/client/ui-primitives/package.json'))
const ts = require('typescript')
const { createElement } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const source = await readFile(new URL('../plugins/tomato-board/src/client/icons.tsx', import.meta.url), 'utf8')
const output = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
const exports = {}
runInNewContext(output, { exports, require(name) {
  assert.equal(name, 'react/jsx-runtime', 'icons must render without any host UI module or icon export')
  return require(name)
} })

for (const [name, size] of [['IconChevronDown', 14], ['IconClose', 16], ['IconCopy', 16], ['IconRefresh', 16]]) {
  test(`${name} renders a visible SVG without host icon exports`, () => {
    const html = renderToStaticMarkup(createElement(exports[name]))
    assert.match(html, new RegExp(`<svg width="${size}" height="${size}"`))
    assert.match(html, /<(path|rect) /)
    assert.match(html, /aria-hidden="true"/)
    const resized = renderToStaticMarkup(createElement(exports[name], { size: 20, className: 'toolbar-icon' }))
    assert.match(resized, /width="20" height="20" class="toolbar-icon"/)
  })
}
