(function () {
  const body = document.body;
  const modeButtons = document.querySelectorAll(".mode-btn");
  const classButtons = document.querySelectorAll(".class-btn");
  const modelViewer = document.getElementById("classModel");
  const modelPlaceholder = document.getElementById("modelPlaceholder");
  const placeholderPath = document.getElementById("placeholderPath");
  const classText = document.getElementById("classText");
  const loreName = document.getElementById("loreName");
  const loreText = document.getElementById("loreText");
  const acceptBtn = document.getElementById("acceptBtn");
  const videoModal = document.getElementById("videoModal");
  const videoFrame = document.getElementById("videoFrame");
  const videoClose = document.getElementById("videoClose");
  const bgProbe = document.getElementById("bgProbe");
  const bgLayerA = document.getElementById("bgLayerA");
  const bgLayerB = document.getElementById("bgLayerB");

  // ---------------------------------------------------------------
  // PLACEHOLDER DATA -- some of this is still meant to be filled in.
  // For each class, "skill" and "fun" each hold a name, a line of
  // flavor text, a path to a .glb model, an animation clip name, and
  // a longer "lore" string. "text" is currently empty on every entry
  // (fill it in if you want the bottom flavor-text line to show
  // anything). "model" points at models/{class}-{mode}.glb -- any
  // combination without a matching file in models/ shows a dashed
  // placeholder box until you add one, no code changes needed.
  // ---------------------------------------------------------------
  const CLASS_DATA = {
    warrior: {
      skill: { name: "Bobo", text: "", model: "models/warrior-skill.glb", lore: "The rest of the skilled section were picked for their individual skill, Bobo however was picked because the demons he chose to fight could have made it to this list on their own (one of them did). By far the cleanest and most impressive warrior at the time, you could easily believe some of these duels were recorded yesterday and not 20 years ago. 9/10", video: "23MOz4cc0Uk", animation: "Stand" },
      fun:   { name: "S&Q Inc Group PVP", text: "", model: "models/warrior-fun.glb", lore: "One of the classiest PvP videos in all of vanilla, the editing, the soundtrack and the 2vX lens they filmed through, S&Q Inc is nothing if not fun. A shoutout to Wheeliecool & Champ for a similar vibe but for us it's gotta be S&Q Inc.", video: "sHJS1bqu6yw", animation: "Stand" }
    },
    paladin: {
      skill: { name: "Arthus", text: "", model: "models/paladin-skill.glb", lore: " Is friends with bobo 6/10", video: "S9XitQA-dkE", animation: "Stand" },
      fun:   { name: "Zalgradis", text: "", model: "models/paladin-fun.glb", lore: "Sketches, engineering, bad voice acting, and a unique playstyle come together in a love letter full of references to other videos of the era", video: "NOXrGmulbMk", animation: "Stand" }
    },
    hunter: {
      skill: { name: "Junglle", text: "", model: "models/hunter-skill.glb", lore: "If Dysphoria had 1 second of PvP in his video he'd be on this side. 5/10", video: "QrXL4bxtymk", animation: "Stand" },
      fun:   { name: "Dysphoria", text: "", model: "models/hunter-fun.glb", lore: " A completely fresh soundtrack for the time and a mental that says nothing is impossible Hunter Vs. World is an all time classic series.", video: "7XgF_P9Ddjk", animation: "Stand" }
    },
    rogue: {
      skill: { name: "Dahis", text: "", model: "models/rogue-skill.glb", lore: "Early attempts at 5-8ing warriors and gouging blinks (techniques that were definitely not standard at the time) are some of the standouts here, add his fairly decent movement and you end up with a very well rounded rogue. 7.5/10", video: "VMCDsXwAEK8", animation: "Stand" },
      fun:   { name: "Mute (World of Roguecraft)", text: "", model: "models/rogue-fun.glb", lore: "The most influential vanilla PvP videos of all time, if you ever saw someone trying to flex on their enemies while naked, it's probably because of mute. (Released in reverse order, episode 3 was the first in the series)", video: "bqx1CFomKMI", animation: "Stand (ID 0 variation 0)" }
    },
    priest: {
      skill: { name: "There are no good priests apparently", text: "", model: "models/priest-skill.glb", lore: "There are no good priests apparently", video: null, animation: "Stand" },
      fun:   { name: "Beckon", text: "", model: "models/priest-fun.glb", lore: "is the Hulksmash of holy priests, sit back, relax, and watch this man cast a 40 second holy fire to take someones head off", video: "x_EgBtUtWBM", animation: "Stand (ID 0 variation 0)" }
    },
    shaman: {
      skill: { name: "Nimhabulove", text: "", model: "models/shaman-skill.glb", lore: " Between totems, shocks, healing and damaging spells shaman has a lot of tools at its disposal, our guy uses them all. And yes, that was a deathcoil that he grounded. 6/10", video: "qxMSzBxxesk", animation: "Stand" },
      fun:   { name: "Cabbarnuke/Unbreakable", text: "", model: "models/shaman-fun.glb", lore: "You have two options here, if you saw Roguecraft and needed more naked pvp Cabbarnuke is your guy, if you're looking for the exact opposite and want to see a man swing a big hammer as hard as he can Unbreakable has got your back", video: "eXE-J13gpNE", animation: "Stand" }
    },
    mage: {
      skill: { name: "Clazzi", text: "", model: "models/mage-skill.glb", lore: "Crispy movement, cooldown management and a complete confidence in his actions. Perhaps the first known recording of a dirty pop, the opening 1vX is one of the best recorded vanilla fights of all time. 9.5/10", video: "3_Tr5aklJ6U", animation: "Stand (ID 0 variation 0)" },
      fun:   { name: "Pathologist", text: "", model: "models/mage-fun.glb", lore: "By far the most unique and creative visual style, Pathologist (Dyf1.6) saw the potential for PvP videos to be more than crit showcases and unedited BG footage, he wanted to make art, not just in video form as half of his soundtracks are his own songs. Had God blessed him with the PvP skill of a Clazzi, he'd be the only name on this list. ", video: "0ZNAWoYEras", animation: "Stand (ID 0 variation 0)" }
    },
    warlock: {
      skill: { name: "Lokilo", text: "", model: "models/warlock-skill.glb", lore: "An actual time traveler, completely cool under pressure with impeccable character control and target selection. What he lacks in flashiness he makes up for in pure cleanliness. 9/10", video: "dPJf4Ocjc-8", animation: "Stand (ID 0 variation 0)" },
      fun:   { name: "Drakedog", text: "", model: "models/warlock-fun.glb", lore: "Did we mention we're fans of Pathologist? Drakedog, who is probably the most beloved vanilla warlock, having Pathologist edit his video for him was a crossover that came out of nowhere and we're glad it did.", video: "I918N8wUvRs", animation: "Stand (ID 0 variation 0)" }
    },
    druid: {
      skill: { name: "Tfo", text: "", model: "models/druid-skill.glb", lore: "Very solid player, he has an exceptional grasp on how to use the utility and strengths of this versatile class. 7.5/10", video: "aX93zH6wJeM", animation: "Stand" },
      fun:   { name: "N E V E R ", text: "", model: "models/druid-fun.glb", lore: "You thought druids were weak in vanilla? Ferahgo and Boro came together to show you otherwise.", video: "J7DN_w0LQUI", animation: "Stand" }
    }
  };

  let currentClass = "warrior";
  let currentMode = "skill";
  let requestedSrc = "";
  let requestedAnimation = "Stand";
  let currentVideoId = null;
  let hasStartedPreload = false;
  let activeBgLayer = bgLayerA;

  // Mirrors the neutral placeholder gradient from style.css -- used
  // as the crossfade layer's image when the probe resolves to "none"
  // (i.e. no background rule exists yet for this class/mode).
  const NEUTRAL_BG =
    'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 75%), ' +
    'linear-gradient(180deg, #211d17 0%, #2c261e 45%, #181410 100%)';

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---------------------------------------------------------------
  // If a lore string ends with a "X/10" or "X.X/10" rating, pull it
  // out and render it as a separate review-score badge (stars + a
  // large number), the way a movie trailer displays a critic score,
  // instead of leaving it as plain trailing text in the paragraph.
  // Lore strings without a trailing rating just render as-is.
  // ---------------------------------------------------------------
  function renderLore(rawLore) {
    const match = /^([\s\S]*?)\s*(\d{1,2}(?:\.\d)?)\s*\/\s*10\s*$/.exec((rawLore || "").trim());

    if (!match) {
      return `<p class="lore-text">${escapeHtml((rawLore || "").trim())}</p>`;
    }

    const mainText = match[1].trim();
    const score = match[2];
    const filledStars = Math.min(10, Math.max(0, Math.round(parseFloat(score))));
    const stars = "★".repeat(filledStars) + "☆".repeat(10 - filledStars);

    return (
      `<p class="lore-text">${escapeHtml(mainText)}</p>` +
      `<p class="lore-rating">` +
      `<span class="rating-stars">${stars}</span>` +
      `<span class="rating-score">${escapeHtml(score)}<span class="rating-outof">/10</span></span>` +
      `</p>`
    );
  }

  // ---------------------------------------------------------------
  // Crossfades the background. Rather than a second copy of every
  // background rule in style.css, this mirrors body's data-class /
  // data-mode onto the hidden #bgProbe element, so the exact same
  // [data-class][data-mode] rules already in style.css resolve on it
  // too -- then reads the resulting image off it with
  // getComputedStyle() and hands that to whichever of the two
  // .bg-layer divs is currently hidden, fading it in while fading the
  // other one out.
  // ---------------------------------------------------------------
  function updateBackground() {
    if (!bgProbe || !bgLayerA || !bgLayerB) return;

    bgProbe.dataset.class = currentClass;
    bgProbe.dataset.mode = currentMode;

    const resolved = getComputedStyle(bgProbe).backgroundImage;
    const image = !resolved || resolved === "none" ? NEUTRAL_BG : resolved;

    const incoming = activeBgLayer === bgLayerA ? bgLayerB : bgLayerA;
    incoming.style.backgroundImage = image;

    // Force layout before adding the class, so the browser registers
    // the new image first and actually animates the opacity change
    // instead of jumping straight to the end state.
    void incoming.offsetWidth;

    incoming.classList.add("visible");
    activeBgLayer.classList.remove("visible");
    activeBgLayer = incoming;
  }

  // If a model's requested animation clip doesn't exist in the file,
  // try these common alternate names before giving up.
  const ANIMATION_FALLBACKS = ["Stand", "Idle", "idle", "stand", "Idle01", "Stand1"];

  // ---------------------------------------------------------------
  // Preload everything on page load instead of waiting for a click.
  // Models: every unique .glb path in CLASS_DATA gets fetched once,
  // which primes the browser's HTTP cache -- when <model-viewer>
  // later requests the same URL, it loads instantly from cache
  // instead of hitting the network. 404s (classes without a real
  // model yet) fail silently, same as they always have.
  // Backgrounds: rather than hardcoding a second list of image paths
  // to keep in sync with style.css, this scans the loaded stylesheet
  // for every "background-image: url(...)" rule and preloads each
  // one via a throwaway Image() object, so any image you add to
  // style.css later gets preloaded automatically with no extra code.
  // ---------------------------------------------------------------
  function preloadAllAssets() {
    const modelPaths = new Set();
    Object.values(CLASS_DATA).forEach((modes) => {
      Object.values(modes).forEach((entry) => {
        if (entry.model) modelPaths.add(entry.model);
      });
    });
    modelPaths.forEach((path) => {
      fetch(path).catch(() => {});
    });

    const urlPattern = /url\((['"]?)([^'")]+)\1\)/g;
    const imageUrls = new Set();
    try {
      Array.from(document.styleSheets).forEach((sheet) => {
        let rules;
        try {
          rules = sheet.cssRules;
        } catch (e) {
          return; // cross-origin stylesheet (e.g. Google Fonts) -- skip
        }
        if (!rules) return;
        Array.from(rules).forEach((rule) => {
          const bg = rule.style && rule.style.backgroundImage;
          if (!bg || bg === "none") return;
          let match;
          while ((match = urlPattern.exec(bg)) !== null) {
            imageUrls.add(match[2]);
          }
        });
      });
    } catch (e) {
      console.warn("Couldn't scan stylesheets to preload background images:", e);
    }
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  function updateView() {
    const data = CLASS_DATA[currentClass][currentMode];

    body.dataset.class = currentClass;
    body.dataset.mode = currentMode;

    updateBackground();

    if (classText) classText.textContent = data.text;
    if (loreName) loreName.textContent = data.name;
    if (loreText) {
      loreText.innerHTML = renderLore(data.lore);
    } else {
      console.warn('script.js expected an element with id="loreText" but did not find one. Make sure index.html, style.css, and script.js are all the latest versions, deployed together.');
    }

    requestedSrc = data.model;
    requestedAnimation = data.animation || "Stand";
    if (modelPlaceholder) modelPlaceholder.classList.remove("visible");
    if (placeholderPath) placeholderPath.textContent = data.model;
    if (modelViewer) {
      modelViewer.setAttribute("src", data.model);
      modelViewer.setAttribute("animation-name", requestedAnimation);
    }

    currentVideoId = data.video || null;

    modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === currentMode));
    classButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.class === currentClass));
  }

  // ---------------------------------------------------------------
  // Fullscreen video modal, opened by the "Accept" button. Each
  // class/mode's YouTube video id lives on its CLASS_DATA entry
  // (the "video" field above) -- set it to a real id, e.g.
  // video: "dQw4w9WgXcQ", to enable the button for that combination.
  // ---------------------------------------------------------------
  function openVideoModal() {
    if (!videoModal) return;

    if (currentVideoId) {
      videoModal.classList.remove("no-video");
      videoFrame.src = "https://www.youtube.com/embed/" + currentVideoId + "?autoplay=1&rel=0";
    } else {
      videoModal.classList.add("no-video");
      videoFrame.src = "";
    }

    videoModal.classList.add("open");
    videoModal.setAttribute("aria-hidden", "false");
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove("open");
    videoModal.setAttribute("aria-hidden", "true");
    videoFrame.src = "";
  }

  if (acceptBtn) acceptBtn.addEventListener("click", openVideoModal);
  if (videoClose) videoClose.addEventListener("click", closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      // Only close when the backdrop itself was clicked, not something
      // inside the popup card (the video, the close button, etc.).
      if (e.target === videoModal) closeVideoModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal && videoModal.classList.contains("open")) closeVideoModal();
  });

  if (modelViewer) {
    modelViewer.addEventListener("error", () => {
      if (modelPlaceholder && modelViewer.getAttribute("src") === requestedSrc) {
        modelPlaceholder.classList.add("visible");
      }
      // Even if the initial model fails to load, still kick off
      // background preloading rather than waiting forever for a
      // "load" event that will never come.
      if (!hasStartedPreload) {
        hasStartedPreload = true;
        preloadAllAssets();
      }
    });

    modelViewer.addEventListener("load", () => {
      if (modelViewer.getAttribute("src") !== requestedSrc) return;

      if (modelPlaceholder) modelPlaceholder.classList.remove("visible");

      // Some .glb files don't have a clip literally named "Stand" (or
      // whatever this class/mode's "animation" field says) -- their
      // idle animation might be called something else entirely. Try a
      // short list of common alternates before giving up, and if none
      // match, log the file's real animation names so you know exactly
      // what to put in CLASS_DATA's "animation" field for this entry.
      const available = modelViewer.availableAnimations || [];

      if (available.includes(requestedAnimation)) {
        modelViewer.animationName = requestedAnimation;
        return;
      }

      const fallback = ANIMATION_FALLBACKS.find((name) => available.includes(name));
      if (fallback) {
        modelViewer.animationName = fallback;
        console.warn(
          `"${requestedSrc}" has no "${requestedAnimation}" animation. Using "${fallback}" instead. ` +
          `Set animation: "${fallback}" for this class/mode in CLASS_DATA to make this permanent and remove this warning.`
        );
      } else {
        console.warn(
          `"${requestedSrc}" has no "${requestedAnimation}" animation and none of the common fallbacks matched either. ` +
          `It's currently playing "${modelViewer.availableAnimations ? modelViewer.availableAnimations[0] : "(unknown)"}" (the file's first animation) instead. ` +
          `Available animations in this file: [${available.join(", ")}]. ` +
          `Set animation: "<one of those>" for this class/mode in CLASS_DATA to fix it.`
        );
      }

      // Once the very first model (whatever's shown on page load) has
      // finished loading, quietly start preloading everything else in
      // the background -- this way the initial model isn't competing
      // for bandwidth with 17 other downloads at the same time.
      if (!hasStartedPreload) {
        hasStartedPreload = true;
        preloadAllAssets();
      }
    });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentMode = btn.dataset.mode;
      updateView();
    });
  });

  classButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentClass = btn.dataset.class;
      updateView();
    });
  });

  updateView();
})();