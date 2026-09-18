(function () {
  // All the visual hover/focus behavior (dimming, desaturating,
  // widening, the gold border) is handled entirely in home.css via
  // :hover/:focus-visible -- this just wires up navigation. Only the
  // Vanilla column goes anywhere; Burning Crusade and Wrath of the
  // Lich King are placeholders for now and do nothing on click.
  document.querySelectorAll(".expansion-column").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.expansion === "vanilla") {
        window.location.href = "character-select.html";
      }
    });
  });

  // ---------------------------------------------------------------
  // Hovering a column plays that expansion's own login music, capped
  // at 20% volume. Switching between columns crossfades: whichever
  // track was playing fades out over 2s while the new one fades in
  // over 2s, at the same time. If you switch again before a fade
  // finishes, it doesn't queue or restart from silence -- each
  // track's fade always continues smoothly from whatever volume it's
  // actually at right now, in whichever direction is currently
  // needed, which is what "resetting" a still-running fade means in
  // practice for something continuous like volume.
  // ---------------------------------------------------------------
  const MAX_VOLUME = 0.2;
  const FADE_MS = 2000;

  const TRACKS = {
    bc: "audio/burning-crusade-music.mp3",
    vanilla: "audio/wow-login-music.mp3",
    wrath: "audio/wrath-music.mp3"
  };

  const audioElements = {};
  const fadeHandles = {};

  Object.keys(TRACKS).forEach((key) => {
    const audio = new Audio(TRACKS[key]);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioElements[key] = audio;
  });

  let activeKey = null;

  function cancelFade(key) {
    if (fadeHandles[key]) {
      cancelAnimationFrame(fadeHandles[key]);
      fadeHandles[key] = null;
    }
  }

  function fadeTo(key, targetVolume, onDone) {
    const audio = audioElements[key];
    if (!audio) return;
    cancelFade(key);
    const startVolume = audio.volume;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / FADE_MS, 1);
      audio.volume = startVolume + (targetVolume - startVolume) * progress;
      if (progress < 1) {
        fadeHandles[key] = requestAnimationFrame(step);
      } else {
        fadeHandles[key] = null;
        if (onDone) onDone();
      }
    }
    fadeHandles[key] = requestAnimationFrame(step);
  }

  function playExpansionAudio(key) {
    if (activeKey === key) return;
    const previousKey = activeKey;
    activeKey = key;

    if (previousKey) {
      fadeTo(previousKey, 0, () => {
        audioElements[previousKey].pause();
      });
    }

    const audio = audioElements[key];
    audio.play().catch(() => {}); // may be blocked until the visitor's first real interaction -- see unlock below
    fadeTo(key, MAX_VOLUME);
  }

  function stopExpansionAudio() {
    if (!activeKey) return;
    const key = activeKey;
    activeKey = null;
    fadeTo(key, 0, () => {
      audioElements[key].pause();
    });
  }

  document.querySelectorAll(".expansion-column").forEach((btn) => {
    const key = btn.dataset.expansion;
    btn.addEventListener("mouseenter", () => playExpansionAudio(key));
    btn.addEventListener("focus", () => playExpansionAudio(key));
  });

  const expansionSelect = document.querySelector(".expansion-select");
  if (expansionSelect) {
    expansionSelect.addEventListener("mouseleave", stopExpansionAudio);
  }

  // Browsers generally only allow audio to start playing as a direct
  // result of a genuine interaction (a click, a keypress, a tap) --
  // hovering doesn't count, so the very first hover before any such
  // interaction may play silently until one happens. This "unlocks"
  // playback for the rest of the visit the moment any real
  // interaction occurs anywhere on the page.
  function unlockAudioContext() {
    Object.values(audioElements).forEach((audio) => {
      audio.play().then(() => audio.pause()).catch(() => {});
    });
  }
  document.addEventListener("click", unlockAudioContext, { once: true });
  document.addEventListener("keydown", unlockAudioContext, { once: true });
  document.addEventListener("touchstart", unlockAudioContext, { once: true });
})();