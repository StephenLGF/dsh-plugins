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

const clientSource = manifest.dshPlugins?.clientSource ?? `src/client/${manifest.name.includes('tomato-board') ? 'TomatoBoard' : 'PrAssistant'}.tsx`
const source = await readFile(resolve(packageRoot, clientSource), 'utf8')
const sourceMap = JSON.parse(await readFile(resolve(packageRoot, 'lib/client.js.map'), 'utf8'))
if (!Array.isArray(sourceMap.sourcesContent) || !sourceMap.sourcesContent.includes(source)) {
  throw new Error(`${manifest.name}: lib/client.js.map does not match the current client source; rebuild the package first`)
}

// Check every bundled source, including nested editors and the worktime model.
for (const [index, name] of sourceMap.sources.entries()) {
  const match = name.match(/(?:^|\/)src\/(.+)$/u)
  if (!match) continue
  const path = resolve(packageRoot, 'src', match[1])
  if (await readFile(path, 'utf8') !== sourceMap.sourcesContent[index]) {
    throw new Error(`${manifest.name}: stale bundled source ${match[1]}; rebuild the package`)
  }
}
