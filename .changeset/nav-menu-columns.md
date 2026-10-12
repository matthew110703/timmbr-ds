---
'@timmbr/ui': minor
---

Add `NavMenuColumns` and `NavMenuPromo` (Figma 105:108 mega-menu dropdown).

- `NavMenuColumns`: a mega-menu panel for `NavHeader` item popovers or any menu panel. It takes a flat list of groups (a bold heading, optionally linked, with links and an optional "more" link) and splits them in order into balanced columns separated by thin dividers (`packNavMenuGroups` minimises the tallest column; up to `columns`, default 3 with an aside and 4 without). An optional `aside` sits after the columns on wide screens. Links render through the header's `linkComponent` (or the component's own), fall back to plain `<a>` with `crossZone`, and close the header popover when clicked.
- `NavMenuPromo`: an image promo card for the aside, with a headline (words in `<em>` use the display face), a subtitle, a divider and an offer badge. The whole card becomes a link when `href` is set.
- The NavHeader mega-menu story now uses both.
- `NavMenuTiles`: image tiles for a mobile menu panel (88px rounded squares with a one-line, truncated label; filled row by row in `rows` rows that scroll sideways; tiles without an image show the label's initial; renders nothing without items).
- `NavHeaderItem.mobileContent`: content for the mobile/tablet tab panel, falling back to `content` (so a desktop mega menu no longer has to show on phones). The header context gains `closeMenus()`, which closes the desktop popover and the mobile panel; the menu templates call it when a link is followed.
