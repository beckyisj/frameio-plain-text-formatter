# Plain Text Formatter for Frame.io

A Chrome extension that adds **Bold / Italic / Strikethrough / Underline** buttons to Frame.io's comment toolbar. Select text in any Frame.io comment, click a button, and the formatting is applied as Unicode characters that look styled but paste anywhere as plain text.

**[Install from Chrome Web Store →](https://chromewebstore.google.com/detail/plain-text-formatter-for/nfbbhcgikdfkjmkakdilefcnmcbbghkn)**

A companion to [plaintext.youtubeproducer.app](https://plaintext.youtubeproducer.app).

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

## Built by

[Becky Isjwara](https://beckyisj.com) — content strategist and the gal behind [youtubeproducer.app](https://youtubeproducer.app).
