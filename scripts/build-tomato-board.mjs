import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const repository = fileURLToPath(new URL('..', import.meta.url))
const harness = resolve(process.env.DSH_HARNESS_ROOT || resolve(repository, '../deepseek-harness'))
const cli = resolve(harness, 'node_modules/tsdown/dist/run.mjs')
if (!existsSync(cli)) throw new Error(`Harness build tools not found at ${cli}; set DSH_HARNESS_ROOT to an installed Harness checkout`)

const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
  cwd: resolve(repository, 'plugins/tomato-board'),
  env: { ...process.env, DSH_HARNESS_ROOT: harness },
  stdio: 'inherit',
})
if (result.error) throw result.error
process.exitCode = result.status ?? 1
