// Plain Text Formatter for Frame.io
// Adds B / I / S / U buttons to the comment toolbar that convert selected text
// into Unicode characters that paste anywhere as plain text.

(() => {
  'use strict';

  // ---------- Unicode maps ----------
  const BOLD_MAP = {};
  const ITALIC_MAP = {};
  const BOLD_ITALIC_MAP = {};
  const MONO_MAP = {};

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';

  for (let i = 0; i < 26; i++) {
    BOLD_MAP[upper[i]] = String.fromCodePoint(0x1D400 + i);
    BOLD_MAP[lower[i]] = String.fromCodePoint(0x1D41A + i);
    ITALIC_MAP[upper[i]] = String.fromCodePoint(0x1D434 + i);
    ITALIC_MAP[lower[i]] = String.fromCodePoint(0x1D44E + i);
    BOLD_ITALIC_MAP[upper[i]] = String.fromCodePoint(0x1D468 + i);
    BOLD_ITALIC_MAP[lower[i]] = String.fromCodePoint(0x1D482 + i);
    MONO_MAP[upper[i]] = String.fromCodePoint(0x1D670 + i);
    MONO_MAP[lower[i]] = String.fromCodePoint(0x1D68A + i);
  }
  ITALIC_MAP['h'] = '\u210E'; // Planck constant — Unicode reserves U+1D455 as the italic h hole
  for (let i = 0; i < 10; i++) {
    BOLD_MAP[digits[i]] = String.fromCodePoint(0x1D7CE + i);
    BOLD_ITALIC_MAP[digits[i]] = String.fromCodePoint(0x1D7CE + i);
    MONO_MAP[digits[i]] = String.fromCodePoint(0x1D7F6 + i);
  }

  const mapChars = (text, map) => [...text].map(ch => map[ch] || ch).join('');
  const toStrike = text => [...text].map(ch => ch + '\u0336').join('');
  const toUnder = text => [...text].map(ch => ch + '\u0332').join('');

  // ---------- Detect already-formatted text and toggle ----------
  // Reverse maps so we can detect Unicode-formatted chars and convert back to plain
  const REVERSE_BOLD = {};
  const REVERSE_ITALIC = {};
  Object.keys(BOLD_MAP).forEach(k => REVERSE_BOLD[BOLD_MAP[k]] = k);
  Object.keys(ITALIC_MAP).forEach(k => REVERSE_ITALIC[ITALIC_MAP[k]] = k);

  const isAllBold = text => {
    const chars = [...text].filter(ch => /\S/.test(ch));
    if (chars.length === 0) return false;
    return chars.every(ch => REVERSE_BOLD[ch] !== undefined);
  };
  const isAllItalic = text => {
    const chars = [...text].filter(ch => /\S/.test(ch));
    if (chars.length === 0) return false;
    return chars.every(ch => REVERSE_ITALIC[ch] !== undefined);
  };
  const stripBold = text => [...text].map(ch => REVERSE_BOLD[ch] || ch).join('');
  const stripItalic = text => [...text].map(ch => REVERSE_ITALIC[ch] || ch).join('');
  const stripStrike = text => text.replace(/\u0336/g, '');
  const stripUnder = text => text.replace(/\u0332/g, '');
  const hasStrike = text => text.includes('\u0336');
  const hasUnder = text => text.includes('\u0332');

  // ---------- Apply transform to current selection ----------
  // Frame.io's comment composer is built on Slate.js, which keeps its own
  // internal document model. We can't mutate the DOM directly (execCommand,
  // textContent, etc.) — Slate would crash with "Cannot resolve a DOM point"
  // because the DOM would drift from its model. Instead we dispatch a synthetic
  // `beforeinput` event with inputType=insertText, which Slate's React
  // beforeinput handler picks up and routes through Editor.insertText() — that
  // updates both the model and the DOM atomically.
  const applyTransform = (transformFn) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const selectedText = sel.toString();
    if (!selectedText) return;

    // Make sure the selection is inside a Frame.io comment input — guard against
    // accidentally rewriting selections elsewhere on the page.
    const anchorNode = sel.anchorNode;
    const editable = anchorNode?.nodeType === Node.ELEMENT_NODE
      ? anchorNode.closest?.('[contenteditable="true"]')
      : anchorNode?.parentElement?.closest?.('[contenteditable="true"]');
    if (!editable) return;

    const transformed = transformFn(selectedText);

    // Dispatch the synthetic beforeinput event. Slate's React handler reads
    // inputType + data and calls Editor.insertText(editor, data), which
    // replaces the current selection with our transformed text and keeps
    // the model in sync.
    const event = new InputEvent('beforeinput', {
      inputType: 'insertText',
      data: transformed,
      bubbles: true,
      cancelable: true
    });
    editable.dispatchEvent(event);
  };

  // Smart toggle handlers — if the selection is already formatted, undo it.
  const handleBold = () => applyTransform(t => isAllBold(t) ? stripBold(t) : mapChars(t, BOLD_MAP));
  const handleItalic = () => applyTransform(t => isAllItalic(t) ? stripItalic(t) : mapChars(t, ITALIC_MAP));
  const handleStrike = () => applyTransform(t => hasStrike(t) ? stripStrike(t) : toStrike(t));
  const handleUnder = () => applyTransform(t => hasUnder(t) ? stripUnder(t) : toUnder(t));

  // ---------- Button creation ----------
  const makeBtn = (label, title, onClick, modifier) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pf-frameio-btn';
    btn.dataset.pfFrameio = '1';
    btn.setAttribute('aria-label', title);
    btn.title = title;
    btn.textContent = label;
    if (modifier) btn.classList.add(`pf-${modifier}`);
    // Don't lose the user's text selection when the button is clicked
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    });
    return btn;
  };

  const makeSeparator = () => {
    const sep = document.createElement('span');
    sep.className = 'pf-frameio-sep';
    sep.dataset.pfFrameio = '1';
    return sep;
  };

  // ---------- Inject buttons into a toolbar row ----------
  const injectIntoToolbar = (toolbar) => {
    if (!toolbar || toolbar.querySelector('[data-pf-frameio="1"]')) return false;

    toolbar.appendChild(makeSeparator());
    toolbar.appendChild(makeBtn('B', 'Bold (Unicode)', handleBold, 'bold'));
    toolbar.appendChild(makeBtn('I', 'Italic (Unicode)', handleItalic, 'italic'));
    toolbar.appendChild(makeBtn('S', 'Strikethrough (Unicode)', handleStrike, 'strike'));
    toolbar.appendChild(makeBtn('U', 'Underline (Unicode)', handleUnder, 'under'));
    return true;
  };

  // ---------- Find all comment-composer toolbars and inject ----------
  // The toolbar row contains the "Draw an annotation" button. We anchor on that
  // because the styled-components hash classes are unstable across deploys.
  // IMPORTANT: each existing icon is wrapped in its own tiny <div> (32px wide),
  // and those wrappers are children of the *real* icons-row flex container
  // which lives TWO levels above the button. We must inject as siblings to the
  // wrapper divs, not inside one of them — otherwise our buttons crash into
  // the icon they were appended next to.
  const scanAndInject = () => {
    const annotateButtons = document.querySelectorAll('[aria-label="Draw an annotation"]');
    annotateButtons.forEach(btn => {
      const wrapper = btn.parentElement;        // 32px <div> around just this button
      const toolbar = wrapper?.parentElement;   // the real icons-row flex container
      if (toolbar) injectIntoToolbar(toolbar);
    });
  };

  // ---------- Watch for new comment composers (replies, navigation) ----------
  let scanScheduled = false;
  const scheduleScan = () => {
    if (scanScheduled) return;
    scanScheduled = true;
    requestAnimationFrame(() => {
      scanScheduled = false;
      scanAndInject();
    });
  };

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.addedNodes.length > 0) {
        scheduleScan();
        return;
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  scanAndInject();
})();
