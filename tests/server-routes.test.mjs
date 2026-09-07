import assert from 'node:assert/strict'
import test from 'node:test'
import { apply as applyPrAssistant } from '../plugins/pr-assistant/lib/index.js'
import { apply as applyTomatoBoard } from '../plugins/tomato-board/lib/index.js'

function loadRoutes(apply, config = {}) {
  const routes = []
  const server = { register(route) { routes.push(route); return () => {} } }
  const ctx = {
    get(name) { assert.equal(name, 'webServer'); return server },
    effect(register) { register() },
  }
  apply(ctx, config)
  return routes
}

async function invoke(route, request) {
  let body = ''
  const headers = {}
  const response = {
    statusCode: 0,
    setHeader(name, value) { headers[name] = value },
    end(value = '') { body = value },
  }
  await route.handler(request, response)
  return { status: response.statusCode, headers, body: body ? JSON.parse(body) : null }
}

test('tomato transition rejects cross-site mutation before invoking the CLI', async () => {
  const route = loadRoutes(applyTomatoBoard).find(item => item.path === '/api/tomato-board/transition')
  const result = await invoke(route, {
    method: 'POST',
    url: '/api/tomato-board/transition/Gitee-Test-2026-737?transition=done',
    headers: { host: 'localhost:3000', origin: 'https://attacker.example', 'sec-fetch-site': 'cross-site' },
  })
  assert.equal(result.status, 403)
})

test('PR routes reject relative repository paths', async () => {
  const route = loadRoutes(applyPrAssistant).find(item => item.path === '/api/pr-assistant/repository')
  const result = await invoke(route, { method: 'GET', url: '/api/pr-assistant/repository?path=relative/repo' })
  assert.equal(result.status, 400)
})

test('read routes reject unsupported methods', async () => {
  const route = loadRoutes(applyPrAssistant).find(item => item.path === '/api/pr-assistant/repository')
  const result = await invoke(route, { method: 'POST', url: '/api/pr-assistant/repository?path=/tmp/repo' })
  assert.equal(result.status, 405)
})
