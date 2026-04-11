# Privacy Policy — Plain Text Formatter for Frame.io

_Last updated: April 11, 2026_

**Short version: This extension collects no data. Full stop.**

## What the extension does

Plain Text Formatter for Frame.io adds four buttons (Bold, Italic, Strikethrough, Underline) to Frame.io's comment toolbar. When you select text in a comment and click a button, the extension converts your selection into Unicode characters (like **𝐛𝐨𝐥𝐝** or _𝘪𝘵𝘢𝘭𝘪𝘤_) and replaces the selection with the converted text.

That's it. Everything happens locally in your browser.

## What we collect

Nothing.

- No personally identifiable information
- No health information
- No financial or payment information
- No authentication information
- No personal communications
- No location data
- No web history
- No user activity tracking (clicks, keystrokes, scroll, mouse position)
- No website content

## What we transmit

Nothing. The extension does not make any network requests. It has no servers, no analytics, no telemetry, no logging, no error reporting. It is pure client-side JavaScript that runs entirely within your browser on `*.frame.io` pages.

## What we store

Nothing. The extension has no local storage, no cookies, no IndexedDB, no background service worker storage. Nothing persists between page loads.

## Third parties

None. The extension does not integrate with any third-party service, SDK, or analytics provider.

## Permissions explained

The extension's `manifest.json` requests `content_scripts` matching `https://*.frame.io/*`. This permission is required for Chrome to let the extension inject its four formatting buttons into Frame.io's comment toolbar and read/write the currently selected text inside comment inputs on that site. It does not grant the extension the ability to read or transmit data from any other domain, and the extension does not read or transmit anything from frame.io either.

## Changes to this policy

If this ever changes (it won't — the extension is intentionally minimal), a new version of the extension will be published and this document updated in the same commit.

## Contact

Questions, concerns, or bug reports: [open an issue on GitHub](https://github.com/beckyisj/frameio-plain-text-formatter/issues) or email `hi@beckyisj.com`.

## Source code

The extension is open source at [github.com/beckyisj/frameio-plain-text-formatter](https://github.com/beckyisj/frameio-plain-text-formatter). You can verify every claim on this page by reading `content.js` and `manifest.json` yourself.
