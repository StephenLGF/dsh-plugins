import assert from 'node:assert/strict'
import test from 'node:test'
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

test('the workboard owns every PR endpoint without a standalone plugin or duplicate route', () => {
  const routes = loadRoutes(applyTomatoBoard)
  const pr = routes.filter(route => route.path.startsWith('/api/tomato-board/pr/'))
  assert.equal(pr.length, 7)
  assert.equal(new Set(routes.map(route => route.path)).size, routes.length)
  assert.ok(pr.some(route => route.path.endsWith('/conflict/push')))
  assert.ok(pr.some(route => route.path.endsWith('/review/comment')))
  assert.equal(routes.some(route => route.path.startsWith('/api/pr-assistant')), false)
})

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
  const route = loadRoutes(applyTomatoBoard).find(item => item.path === '/api/tomato-board/pr/repository')
  const result = await invoke(route, { method: 'GET', url: '/api/tomato-board/pr/repository?path=relative/repo' })
  assert.equal(result.status, 400)
})

test('read routes reject unsupported methods', async () => {
  const route = loadRoutes(applyTomatoBoard).find(item => item.path === '/api/tomato-board/pr/repository')
  const result = await invoke(route, { method: 'POST', url: '/api/tomato-board/pr/repository?path=/tmp/repo' })
  assert.equal(result.status, 405)
})
