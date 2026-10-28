import css from './tomato-link-button.module.css'

/** One external-item action, using the configured host and tenant on the server. */
export function TomatoLinkButton({ itemKey, disabled = false }: { itemKey: string; disabled?: boolean }) {
  return <button type="button" className={css.button} disabled={disabled || !itemKey}
    title="在番茄中查看" aria-label={`在番茄中查看 ${itemKey}`}
    onClick={event => {
      event.stopPropagation()
      window.open(`/api/tomato-board/open/${encodeURIComponent(itemKey)}`, '_blank', 'noopener,noreferrer')
    }}
    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') event.stopPropagation() }}>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 3h4v4M13 3 7 9M6 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
}
