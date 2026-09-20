import { jsx as _jsx } from "react/jsx-runtime";
import css from './tag.module.css';
/**
 * The one tag chip used across the workbench — card metadata, filter chips and
 * status labels. Static usage renders a span; interactive usage renders a
 * toggle button. Only callers that pass `tone` get a colored chip (by
 * convention just the item-type tags).
 */
export function Tag({ children, tone, interactive = false, pressed, title, className, onClick }) {
    const style = tone === undefined ? undefined : { '--tag-tone': tone };
    const classes = [
        css.tag,
        tone === undefined ? '' : css.toned,
        interactive ? css.toggle : '',
        interactive && pressed === false ? css.off : '',
        className,
    ].filter(Boolean).join(' ');
    if (interactive) {
        return (_jsx("button", { type: "button", className: classes, style: style, title: title, "aria-pressed": pressed, onClick: onClick, children: children }));
    }
    return _jsx("span", { className: classes, style: style, title: title, children: children });
}
//# sourceMappingURL=Tag.js.map