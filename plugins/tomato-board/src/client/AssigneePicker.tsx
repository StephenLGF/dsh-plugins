import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Button, IconChevronDownOutline14 } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './tomato-board.module.css'

export interface AssigneeUser {
  username: string
  name: string
}

/** Shared searchable assignee picker used by the board and worktime pages. */
export function AssigneePicker({ users, value, onChange, label = '负责人', className, currentUserName = '我负责的', ariaLabel }: {
  users: AssigneeUser[]
  value: string
  onChange: (value: string) => void
  /** Set to null to hide the leading label (compact toolbar usage). */
  label?: ReactNode
  className?: string
  currentUserName?: string
  ariaLabel?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const options = useMemo(() => [{ username: 'currentUser()', name: currentUserName }, ...users.filter(user => user.username !== 'currentUser()')], [users, currentUserName])
  const selected = options.find(option => option.username === value) ?? options[0]
  const needle = query.trim().toLowerCase()
  const filtered = needle
    ? options.filter(option => `${option.name} ${option.username}`.toLowerCase().includes(needle))
    : options

  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close, true)
    return () => document.removeEventListener('pointerdown', close, true)
  }, [open])

  return (
    <div className={[css.assigneeFilter, className].filter(Boolean).join(' ')}>
      {label ? <span>{label}</span> : null}
      <div ref={rootRef} className={css.assigneePicker}>
        <Button variant="outline" size="sm" className={css.assigneeTrigger} aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open} onClick={() => { setOpen(current => !current); setQuery('') }}>
          <span>{selected?.name ?? value}</span><IconChevronDownOutline14 />
        </Button>
        {open ? (
          <div className={css.assigneeDropdown}>
            <input autoFocus type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索昵称或用户名…" aria-label="搜索负责人" />
            <div role="listbox" aria-label="负责人">
              {filtered.map(option => (
                <button key={option.username} type="button" role="option" aria-selected={option.username === value} onClick={() => { onChange(option.username); setOpen(false); setQuery('') }}>
                  <strong>{option.name}</strong>{option.name !== option.username && option.username !== 'currentUser()' ? <small>{option.username}</small> : null}
                </button>
              ))}
              {filtered.length === 0 ? <p>没有匹配的负责人</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
