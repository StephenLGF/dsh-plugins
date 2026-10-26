import { accessSync, constants } from 'node:fs'
import { homedir } from 'node:os'
import { delimiter, isAbsolute, join } from 'node:path'

/** Resolve a CLI for GUI processes whose inherited PATH omits user bin folders. */
export function resolveCliExecutable(executable: string, path = process.env.PATH ?? '', home = homedir()): string {
  if (isAbsolute(executable) || executable.includes('/') || executable.includes('\\')) return executable
  const directories = [...path.split(delimiter).filter(Boolean), join(home, '.local', 'bin'), join(home, 'go', 'bin'), '/opt/homebrew/bin', '/usr/local/bin']
  for (const directory of directories) {
    const candidate = join(directory, executable)
    try { accessSync(candidate, constants.X_OK); return candidate } catch { /* Continue through executable search directories. */ }
  }
  throw new Error(`找不到 ${executable} 可执行文件，请在番茄工作台插件配置 executable 中填写绝对路径`)
}
