import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

const packageRoot = resolve(process.argv[2] || '.')
const manifest = JSON.parse(await readFile(resolve(packageRoot, 'package.json'), 'utf8'))
const required = [
  'cordis.patch.yml', 'lib/index.js', 'lib/invariant.js', 'lib/client.js',
  'lib/client.js.map', 'lib/types/index.d.ts', 'lib/types/client/index.d.ts',
]

for (const file of required) {
  const info = await stat(resolve(packageRoot, file)).catch(() => null)
  if (!info?.isFile() || info.size === 0) throw new Error(`${manifest.name}: missing or empty ${file}`)
}

const source = await readFile(resolve(packageRoot, `src/client/${manifest.name.includes('tomato-board') ? 'TomatoBoard' : 'PrAssistant'}.tsx`), 'utf8')
const sourceMap = JSON.parse(await readFile(resolve(packageRoot, 'lib/client.js.map'), 'utf8'))
if (!Array.isArray(sourceMap.sourcesContent) || !sourceMap.sourcesContent.includes(source)) {
  throw new Error(`${manifest.name}: lib/client.js.map does not match the current client source; rebuild in deepseek-harness first`)
}
