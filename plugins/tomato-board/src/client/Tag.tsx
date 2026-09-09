import type { CSSProperties, ReactNode } from 'react'
import css from './tag.module.css'

export interface TagProps {
  children: ReactNode
  /** Tint color (hex or CSS color var). Omit for the neutral card-meta look. */
  tone?: string | undefined
  /** Render as a toggle button (filter chips) instead of a static span. */
  interactive?: boolean
  /** Toggle state for interactive tags; false renders the dimmed-off look. */
  pressed?: boolean | undefined
  title?: string | undefined
  className?: string | undefined
  onClick?: (() => void) | undefined
}

/**
 * The one tag chip used across the workbench — card metadata, filter chips and
 * status labels. Static usage renders a span; interactive usage renders a
 * toggle button. Only callers that pass `tone` get a colored chip (by
 * convention just the item-type tags).
 */
export function Tag({ children, tone, interactive = false, pressed, title, className, onClick }: TagProps) {
  const style = tone === undefined ? undefined : { '--tag-tone': tone } as CSSProperties
  const classes = [
    css.tag,
    tone === undefined ? '' : css.toned,
    interactive ? css.toggle : '',
    interactive && pressed === false ? css.off : '',
    className,
  ].filter(Boolean).join(' ')
  if (interactive) {
    return (
      <button type="button" className={classes} style={style} title={title} aria-pressed={pressed} onClick={onClick}>
        {children}
      </button>
    )
  }
  return <span className={classes} style={style} title={title}>{children}</span>
}
