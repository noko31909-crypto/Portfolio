// Tiny element builder. Text is always set with textContent, never innerHTML, so
// listing text from the database can't inject markup.

/**
 * @param {string} tag
 * @param {Record<string, unknown> | null} [attrs]
 * @param {...(Node | string | null | undefined | false)} children
 */
export function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs ?? {})) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') el.className = String(value);
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2), /** @type {EventListener} */ (value));
    else el.setAttribute(key, value === true ? '' : String(value));
  }
  append(el, children);
  return el;
}

function append(el, children) {
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    if (Array.isArray(child)) append(el, child);
    else el.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
}

/** Delay after the last keystroke before a search box re-filters. */
export const SEARCH_DEBOUNCE_MS = 120;

/** @param {string} id */
export function byId(id) {
  return /** @type {HTMLElement} */ (document.getElementById(id));
}

/** @template {unknown[]} A @param {(...args: A) => void} fn @param {number} ms */
export function debounce(fn, ms) {
  let timer;
  return (/** @type {A} */ ...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/**
 * Puts the current filters in the address bar so the view can be shared. Some
 * embedding frames refuse history changes; the page keeps working without it.
 * @param {URLSearchParams} params
 */
export function replaceUrl(params) {
  const qs = params.toString();
  try {
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  } catch {
    // Not allowed here (sandboxed frame): the filters still apply, they just aren't in the URL.
  }
}

/** Shows a message in an alert region that starts hidden. */
export function showError(elementId, message) {
  const el = byId(elementId);
  el.textContent = message;
  el.hidden = false;
}

/** Swaps every <span data-icon="name"> placeholder in the page for its SVG. */
export function drawIconPlaceholders(icons, size = 20) {
  for (const el of document.querySelectorAll('[data-icon]')) {
    el.replaceWith(svg(icons[/** @type {HTMLElement} */ (el).dataset.icon], { size }));
  }
}

/**
 * An <img> inside `wrapper` that swaps the whole wrapper for `fallback` if the image
 * fails to load (vendor URLs can move or disappear).
 * @param {Record<string, unknown>} imgAttrs
 * @param {HTMLElement} wrapper element the image goes into; replaced on failure
 * @param {() => Node} fallback
 */
export function imageOrFallback(imgAttrs, wrapper, fallback) {
  const img = h('img', { decoding: 'async', referrerpolicy: 'no-referrer', ...imgAttrs });
  img.addEventListener('error', () => wrapper.replaceWith(fallback()), { once: true });
  wrapper.prepend(img);
  return wrapper;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Builds an SVG from trusted, hard-coded path data in icons.js. */
export function svg(paths, { size = 24, label = null, className = 'icon' } = {}) {
  const el = document.createElementNS(SVG_NS, 'svg');
  el.setAttribute('viewBox', '0 0 48 48');
  el.setAttribute('width', String(size));
  el.setAttribute('height', String(size));
  el.setAttribute('class', className);
  el.setAttribute('fill', 'none');
  el.setAttribute('stroke', 'currentColor');
  el.setAttribute('stroke-width', '2.5');
  el.setAttribute('stroke-linecap', 'round');
  el.setAttribute('stroke-linejoin', 'round');
  if (label) {
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', label);
  } else {
    el.setAttribute('aria-hidden', 'true');
  }
  for (const d of paths) {
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', d);
    el.append(p);
  }
  return el;
}
