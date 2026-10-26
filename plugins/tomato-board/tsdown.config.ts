import { resolve } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

// Reuse the Harness bundle format, but compile this checkout's sources in place.
const harness = process.env.DSH_HARNESS_ROOT || fileURLToPath(new URL('../../../deepseek-harness/', import.meta.url))
const { clientBundle } = await import(pathToFileURL(resolve(harness, 'packages/client/tsdown.client.ts')).href)
const bundle = clientBundle('@stephen1620/dsh-tomato-board', [
  'src/index.ts',
  'src/invariant.ts',
])

export default (config: Parameters<typeof bundle>[0]) => bundle(config).map(value => ({ ...value, tsconfig: false }))
