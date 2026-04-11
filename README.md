# Plain Text Formatter for Frame.io

A Chrome extension that adds **Bold / Italic / Strikethrough / Underline** buttons to Frame.io's comment toolbar. Select text in any Frame.io comment, click a button, and the formatting is applied as Unicode characters that look styled but paste anywhere as plain text.

A companion to [plaintext.youtubeproducer.app](https://plaintext.youtubeproducer.app).

---

## Install

The extension isn't on the Chrome Web Store yet, so for now you install it manually. It only takes a minute.

1. **Download this repo**
   - Click the green **Code** button at the top of this page → **Download ZIP**
   - Unzip the file. You'll get a folder called `frameio-plain-text-formatter-main` (or similar)

2. **Open Chrome extensions**
   - Visit `chrome://extensions/`
   - Toggle **Developer mode** on (top right corner)

3. **Load the extension**
   - Click **Load unpacked**
   - Select the unzipped folder

4. **Use it**
   - Open any Frame.io page
   - The B / I / S / U buttons appear in the comment toolbar, right after the existing icons
   - Select text in a comment → click a button → done

---

## How it works

- The extension watches for Frame.io's comment composer toolbar and injects four formatting buttons
- It anchors on the "Draw an annotation" button (whose `aria-label` stays stable across Frame.io deploys), then walks up to the icons-row container so its own buttons sit as siblings to the existing icons
- Frame.io's comment editor is built on **Slate.js**, which keeps its own internal model of the document. The extension dispatches a synthetic `beforeinput` event with `inputType: insertText` so Slate updates both its model and the DOM atomically — no DOM/model drift, no Slate crashes
- Smart toggle: if the selection is *already* bold/italic/struck/underlined, clicking the button removes the formatting

## Supported formatting

| Button | What you get |
|--------|--------------|
| **B** | Mathematical Bold (𝐀-𝐳, 𝟎-𝟗) |
| **I** | Mathematical Italic (𝐴-𝑧) |
| **S** | Strikethrough via combining U+0336 |
| **U** | Underline via combining U+0332 |

## Updating after edits

If you make changes to the code:

1. Visit `chrome://extensions/`
2. Click the **reload** icon on the extension card
3. Refresh your Frame.io tab

## Built by

[Becky Isjwara](https://beckyisj.com) — content strategist and the gal behind [youtubeproducer.app](https://youtubeproducer.app).
