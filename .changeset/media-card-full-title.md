---
"@timmbr/ui": minor
---

**`MediaCard`**: new `fullTitle` prop, the browser's hover text (HTML `title` attribute) so a title clamped to two lines can still be read in full. It defaults to `title` when that is a string. With `href` it is set on the title link, which covers the whole card; otherwise on the title element. `linkComponent` now also receives `title`.
