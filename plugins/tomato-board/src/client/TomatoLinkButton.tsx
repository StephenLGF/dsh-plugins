import css from './tomato-link-button.module.css'

function externalUrl(value: unknown): string {
  if (typeof value !== 'string' || !value) return ''
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return ''
    const host = url.hostname.toLowerCase()
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host.endsWith('.localhost')) return ''
    return url.toString()
  } catch {
    return ''
  }
}

async function resolveTomatoUrl(itemKey: string): Promise<string> {
  const response = await fetch(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, {
    headers: { accept: 'application/json' },
  })
  const body = await response.json() as { tomatoUrl?: unknown }
  return response.ok ? externalUrl(body.tomatoUrl) : ''
}

/** Opens the configured Tomato item page in the system browser. */
export function TomatoLinkButton({ itemKey, tomatoUrl = '', disabled = false }: { itemKey: string; tomatoUrl?: string; disabled?: boolean }) {
  return <button type="button" className={css.button} disabled={disabled || !itemKey}
    title="在番茄中查看" aria-label={`在番茄中查看 ${itemKey}`}
    onClick={event => {
      event.stopPropagation()
      const known = externalUrl(tomatoUrl)
      if (known) {
        window.open(known, '_blank', 'noopener,noreferrer')
        return
      }
      void resolveTomatoUrl(itemKey).then(url => {
        if (url) window.open(url, '_blank', 'noopener,noreferrer')
      }).catch(() => {})
    }}
    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') event.stopPropagation() }}>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 3h4v4M13 3 7 9M6 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
}
