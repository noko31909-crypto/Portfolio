// The 30-second intro video in the header. Nothing shows until assets/intro.mp4
// actually loads, so the page looks finished before the video is exported.
// Wide screens play it muted in the header; narrow screens get a button that opens it.
import { byId } from './dom.js';

const SRC = 'assets/intro.mp4';
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const wide = matchMedia('(min-width: 1040px)');

const figure = byId('intro');
const video = /** @type {HTMLVideoElement} */ (byId('intro-video'));
const toggle = byId('intro-toggle');
const sound = byId('intro-sound');
const openBtn = byId('intro-open');
const dialog = /** @type {HTMLDialogElement} */ (byId('intro-dialog'));
const dialogVideo = /** @type {HTMLVideoElement} */ (byId('intro-dialog-video'));

let userPaused = reduceMotion.matches; // people who asked for less motion start it themselves

video.addEventListener('loadeddata', () => {
  figure.hidden = false;
  openBtn.hidden = false;
  watchVisibility();
  sync();
}, { once: true });
// A missing file just leaves the intro hidden.
video.addEventListener('error', () => { figure.hidden = true; openBtn.hidden = true; }, { once: true });
video.src = SRC;

/** Plays only while the header video is on screen and wide enough to show. */
function watchVisibility() {
  if (!('IntersectionObserver' in window)) return playIfAllowed(true);
  new IntersectionObserver(([entry]) => playIfAllowed(entry.isIntersecting), { threshold: 0.4 }).observe(video);
}

function playIfAllowed(visible) {
  if (visible && wide.matches && !userPaused) video.play().catch(() => { userPaused = true; sync(); });
  else video.pause();
}

function sync() {
  const playing = !video.paused;
  toggle.textContent = playing ? 'Pause' : 'Play';
  toggle.setAttribute('aria-pressed', String(!playing));
  sound.textContent = video.muted ? 'Sound on' : 'Sound off';
  sound.setAttribute('aria-pressed', String(!video.muted));
}

video.addEventListener('play', sync);
video.addEventListener('pause', sync);

toggle.addEventListener('click', () => {
  userPaused = !video.paused;
  if (userPaused) video.pause();
  else video.play().catch(() => {});
});

sound.addEventListener('click', () => {
  video.muted = !video.muted;
  if (!video.muted && video.paused) { userPaused = false; video.play().catch(() => {}); }
  sync();
});

wide.addEventListener('change', () => playIfAllowed(wide.matches));

// Narrow screens: open the video in a dialog, with sound and the browser's own controls.
openBtn.addEventListener('click', () => {
  if (!dialogVideo.src) dialogVideo.src = SRC;
  video.pause();
  dialog.showModal();
  dialogVideo.play().catch(() => {});
});
byId('intro-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => dialogVideo.pause());
