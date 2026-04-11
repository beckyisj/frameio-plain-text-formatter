# Chrome Web Store Submission Guide

Everything you need is in this folder. Should take **about 5 minutes** to submit.

## Files to upload

| File | What it is | Where it goes in the dashboard |
|------|------------|--------------------------------|
| `extension.zip` | The extension code (16KB) | "Package" → Upload new package |
| `screenshot-1-hero.png` | 1280×800 — real Frame.io screen with the extension active | Store listing → Screenshots |
| `screenshot-2-closeup.png` | 1280×800 — branded close-up of the comment composer with formatting | Store listing → Screenshots |
| `small-promo-tile.png` | 440×280 — small promo tile | Store listing → Promotional images → Small tile |
| `marquee.png` | 1400×560 — marquee promo tile | Store listing → Promotional images → Marquee tile |

The 128×128 store icon is already inside the extension package, no separate upload needed.

---

## Listing copy (copy/paste these)

### Name (max 75 chars)

```
Plain Text Formatter for Frame.io
```

### Summary (max 132 chars)

```
Add Bold, Italic, Strikethrough, and Underline buttons to Frame.io comments. Format with Unicode characters that paste anywhere.
```

### Category

`Productivity`

### Language

`English (United States)`

### Detailed description

```
Frame.io comments don't support rich text formatting. This extension fixes that.

It adds four new buttons — Bold, Italic, Strikethrough, and Underline — right inside Frame.io's comment toolbar, sitting next to the existing icons. Select text in any comment, click a button, and your text gets formatted using Unicode characters.

Why Unicode characters? Because they're plain text, not HTML. That means the formatting survives wherever your comment ends up: Frame.io comments, copy-pasted into emails, Slack messages, anywhere. No fancy editor required.

WHAT YOU GET
• Bold (𝐛𝐨𝐥𝐝)
• Italic (𝘪𝘵𝘢𝘭𝘪𝘤)
• Strikethrough (s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶)
• Underline (u̲n̲d̲e̲r̲l̲i̲n̲e̲)

HOW TO USE
1. Open any Frame.io page
2. Click the comment box
3. Type and select some text
4. Click B, I, S, or U in the toolbar
5. Click again to toggle the formatting off

Smart toggle: clicking a button on already-formatted text strips the formatting back to plain.

Built specifically for Frame.io's editor (which is built on Slate.js), so it plays nicely with the comment composer and never breaks your submission.

PRIVACY
This extension collects zero data. It doesn't make network requests, doesn't store anything, and only runs on Frame.io pages. Everything happens locally in your browser.

LINKS
• Web version (no install needed): https://plaintext.youtubeproducer.app
• Source code: https://github.com/beckyisj/frameio-plain-text-formatter
• Built by Becky Isjwara — content strategist and the gal behind youtubeproducer.app
```

### Privacy practices (in the dashboard there's a form)

- **Single purpose**: "Adds Bold, Italic, Strikethrough, and Underline formatting buttons to Frame.io's comment toolbar."
- **Permission justification (host_permissions for *.frame.io)**: "The extension only modifies the comment toolbar UI on Frame.io pages and never reads or transmits user data."
- **Data usage**: Check **"This extension does not collect or use user data"** — and certify that:
  - It does not collect or use Personally Identifiable Information
  - It does not collect or use Health Information
  - It does not collect or use Financial and Payment Information
  - It does not collect or use Authentication Information
  - It does not collect or use Personal Communications
  - It does not collect or use Location
  - It does not collect or use Web History
  - It does not collect or use User Activity
  - It does not collect or use Website Content
- **Remote code use**: No
- **Privacy policy URL**: not required when no data is collected, but if the form insists, paste `https://plaintext.youtubeproducer.app`

### Distribution

- **Visibility**: Public
- **Regions**: All regions
- **Mature content**: No

---

## Step-by-step

1. Go to **https://chrome.google.com/webstore/devconsole**
2. Sign in with the same Google account you use for the YouTube Popular This Year extension
3. Click **+ New item** (top right)
4. Drag-drop `extension.zip` (or click and select it)
5. Wait for it to upload and validate
6. Fill out the **Store listing** tab:
   - Paste the **Name**, **Summary**, and **Detailed description** from above
   - Upload `screenshot-1-hero.png` and `screenshot-2-closeup.png` to the **Screenshots** section
   - Upload `small-promo-tile.png` to the **Small promo tile** slot
   - Upload `marquee.png` to the **Marquee promo tile** slot
   - Set **Category** to Productivity
   - Set **Language** to English (US)
7. Fill out the **Privacy practices** tab using the data above
8. Fill out the **Distribution** tab — Public, all regions
9. Click **Submit for review** (top right)

Google's review usually takes anywhere from a few hours to a few days. You'll get an email when it's published or if they need anything.

---

## After publishing

Once it's live and Google gives you the Chrome Web Store URL:

1. Update the "Get the extension" button on `plaintext.youtubeproducer.app` to point to the Chrome Web Store URL instead of the GitHub repo
2. Update the README in `frameio-plain-text-formatter` repo to lead with the Web Store install link
3. Update the YouTube Producer landing page card link to the Web Store URL

I'll handle all three in one PR once you send me the URL.
