/** Plugin-owned icons avoid host export renames (numeric sizes vs Medium/Regular). */
interface IconProps {
  size?: number | undefined
  className?: string | undefined
}

export function IconChevronDown({ size = 14, className }: IconProps) {
  return <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m4 6 4 4 4-4" /></svg>
}

export function IconClose({ size = 16, className }: IconProps) {
  return <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="m4 4 8 8M12 4l-8 8" /></svg>
}

export function IconCopy({ size = 16, className }: IconProps) {
  return <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" /><path d="M10.5 3.5V3A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.5" /></svg>
}

export function IconRefresh({ size = 16, className }: IconProps) {
  return <svg width={size} height={size} className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M13 6a5.2 5.2 0 1 0 .1 3M13 2.5V6H9.5" /></svg>
}
