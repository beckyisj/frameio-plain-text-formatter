// Connects to a running Arc/Chromium with --remote-debugging-port=9222,
// finds the Chrome Web Store dev console tab, and fills the listing form.
//
// Usage:
//   1. Quit Arc fully (Cmd+Q)
//   2. open -a Arc --args --remote-debugging-port=9222
//   3. Sign in, navigate to the dev console listing edit page
//   4. node cws-fill.mjs [inspect|fill]
//
// `inspect` mode: dumps the form structure so we can see what to fill
// `fill` mode: fills the form

import { chromium } from '/Users/beckyisjwara/Cursor/youtube-producer/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mode = process.argv[2] || 'inspect';

const NAME = 'Plain Text Formatter for Frame.io';
const SUMMARY = 'Add Bold, Italic, Strikethrough, and Underline buttons to Frame.io comments. Format with Unicode characters that paste anywhere.';
const DESCRIPTION = `Frame.io comments don't support rich text formatting. This extension fixes that.

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
• Built by Becky Isjwara — content strategist and the gal behind youtubeproducer.app`;

const ASSETS = {
  smallTile: resolve(__dirname, 'small-promo-tile.png'),
  marquee: resolve(__dirname, 'marquee.png'),
  screenshot1: resolve(__dirname, 'screenshot-1-hero.png'),
  screenshot2: resolve(__dirname, 'screenshot-2-closeup.png'),
};

async function findDevConsolePage(browser) {
  for (const ctx of browser.contexts()) {
    for (const page of ctx.pages()) {
      const url = page.url();
      if (url.includes('chrome.google.com/webstore/devconsole')) {
        return page;
      }
    }
  }
  return null;
}

async function inspect(page) {
  console.log('--- URL:', page.url());
  console.log('--- Title:', await page.title());

  // Dump all visible text inputs, textareas, and buttons with labels
  const fields = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('input, textarea, select').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return; // hidden
      out.push({
        kind: 'input',
        type: el.type || el.tagName,
        name: el.name || '',
        id: el.id || '',
        aria: el.getAttribute('aria-label') || '',
        placeholder: el.placeholder || '',
        // Try to find an associated label
        labelFor: (() => {
          if (el.id) {
            const lbl = document.querySelector(`label[for="${el.id}"]`);
            if (lbl) return lbl.textContent.trim().slice(0, 80);
          }
          const parentLabel = el.closest('label');
          if (parentLabel) return parentLabel.textContent.trim().slice(0, 80);
          return '';
        })(),
        value: (el.value || '').slice(0, 60),
      });
    });
    document.querySelectorAll('button').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const txt = el.textContent?.trim().slice(0, 60) || '';
      const aria = el.getAttribute('aria-label') || '';
      if (txt || aria) {
        out.push({ kind: 'button', text: txt, aria });
      }
    });
    // Also look for contenteditable rich text editors
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      out.push({
        kind: 'contenteditable',
        aria: el.getAttribute('aria-label') || '',
        labelledby: el.getAttribute('aria-labelledby') || '',
        text: el.textContent?.trim().slice(0, 60) || '',
      });
    });
    return out;
  });
  console.log(JSON.stringify(fields, null, 2));
}

async function fill(page) {
  console.log('Fill mode not yet implemented — run inspect first to map selectors.');
}

const browser = await chromium.connectOverCDP('http://localhost:9222');
const page = await findDevConsolePage(browser);
if (!page) {
  console.error('No Chrome Web Store dev console tab found. Open the listing edit page in Arc first.');
  console.log('Open tabs:');
  for (const ctx of browser.contexts()) {
    for (const p of ctx.pages()) {
      console.log(' -', p.url());
    }
  }
  process.exit(1);
}

if (mode === 'inspect') {
  await inspect(page);
} else if (mode === 'fill') {
  await fill(page);
}

// Don't close — leave Arc alone
console.log('done');
