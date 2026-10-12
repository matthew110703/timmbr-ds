---
'@timmbr/ui': minor
'@timmbr/utils': minor
---

Generic helpers for data-driven navigation menus.

- `@timmbr/utils` `mapTree(nodes, fn)`: maps any tree bottom-up (`fn` gets each node and its already-mapped children), e.g. to copy a tree with fewer fields before passing it to a client component.
- `@timmbr/ui` `toNavMenuItems(menus, options)`: turns plain menu data (`{ id, label, groups, tiles?, aside? }`) into `NavHeader` items that open `NavMenuColumns` on desktop and `NavMenuTiles` in the mobile tab panel. Options: `crossZone`, `linkComponent`, `popoverWidth` (default `'container'`).
