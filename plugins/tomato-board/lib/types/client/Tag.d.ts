import type { ReactNode } from 'react';
export interface TagProps {
    children: ReactNode;
    /** Tint color (hex or CSS color var). Omit for the neutral card-meta look. */
    tone?: string | undefined;
    /** Render as a toggle button (filter chips) instead of a static span. */
    interactive?: boolean;
    /** Toggle state for interactive tags; false renders the dimmed-off look. */
    pressed?: boolean | undefined;
    title?: string | undefined;
    className?: string | undefined;
    onClick?: (() => void) | undefined;
}
/**
 * The one tag chip used across the workbench — card metadata, filter chips and
 * status labels. Static usage renders a span; interactive usage renders a
 * toggle button. Only callers that pass `tone` get a colored chip (by
 * convention just the item-type tags).
 */
export declare function Tag({ children, tone, interactive, pressed, title, className, onClick }: TagProps): import("react").JSX.Element;
//# sourceMappingURL=Tag.d.ts.map