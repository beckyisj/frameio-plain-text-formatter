# Plain Text Formatter for Frame.io

Chrome extension that adds **B / I / S / U** buttons to the Frame.io comment toolbar. Select text in a comment, click a button, and it gets converted to Unicode characters that look like rich formatting but paste anywhere as plain text.

Companion to [plaintext.youtubeproducer.app](https://plaintext.youtubeproducer.app).

## Install (developer mode)

1. Open Chrome → `chrome://extensions/`
2. Toggle **Developer mode** (top right)
3. Click **Load unpacked**
4. Select this folder (`~/Cursor/chrome-extensions/frameio-formatter`)
5. Open any Frame.io page — the buttons will appear in the comment toolbar

## How it works

- Watches for the comment composer toolbar (anchors on the "Draw an annotation" button so it works even when Frame.io ships new styled-components hashes)
- Re-injects on SPA navigation and reply boxes via MutationObserver
- Uses `document.execCommand('insertText', ...)` so React/Downshift's controlled input picks up the change
- Buttons are smart-toggle: if the selection is already bold/italic/etc., clicking the button strips the formatting

## Reload after edits

Edit any file → go to `chrome://extensions` → click the reload icon on this extension's card → refresh the Frame.io tab.
