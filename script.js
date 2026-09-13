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
  const videoStage = document.getElementById("videoStage");
  const videoMissing = document.getElementById("videoMissing");
  const bgProbe = document.getElementById("bgProbe");
  const bgLayerA = document.getElementById("bgLayerA");
  const bgLayerB = document.getElementById("bgLayerB");
  const honorableBtn = document.getElementById("honorableBtn");
  const honorableBackBtn = document.getElementById("honorableBackBtn");
  const honorableClassButtons = document.querySelectorAll(".honorable-class-btn");
  const honorableListFun = document.getElementById("honorableListFun");
  const honorableListSkill = document.getElementById("honorableListSkill");

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
      skill: { name: "There are no good priests apparently", text: "", model: "models/priest-skill.glb", lore: "There are no good priests apparently", video: "X9737mnPejQ", animation: "Stand" },
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

  // ---------------------------------------------------------------
  // Honorable Mentions -- a longer list per class/mode, each entry
  // just a name plus optional lore text and an optional YouTube
  // video id. Unlike the main CLASS_DATA entry above, these are
  // collapsed by default and expand on click. Add or remove entries
  // freely -- each is just { name: "...", lore: "...", video: "..." }
  // or { name: "...", lore: "", video: null } if you only have a name
  // so far.
  // ---------------------------------------------------------------
  const HONORABLE_MENTIONS = {
    warrior: {
      skill: [{ name: "Laintime", lore: "People think of Laintime as the godfather of warriors, we remember him as the lone pillar holding up the tuber industry. The people of Felwood thank you, Laintime", video: "LFkSidbQu2o" }],
      fun: [{ name: "Swifty", lore: "", video: "HUPexEfCG7g" }, { name: "Pat", lore: "", video: "nuRGBnjELkgokll" }, { name: "Maydie", lore: "", video: "SwSR1SHYZRI" }, { name: "Illusion", lore: "", video: "STq43Pxqgc4" }, { name: "Spinister", lore: "", video: "hW8ButI6mns" }, { name: "Hulksmash", lore: "", video: "IAR1CsAXLCw" }, { name: "Xahlior", lore: "", video: "oKQNJL5IL2s" }]
    },
    paladin: {
      skill: [{ name: "Chipman", lore: "", video: "b2EfsrD_Mqk" }, { name: "Kirill", lore: "", video: "fhnEhZVzo3I" }],
      fun: []
    },
    hunter: {
      skill: [{ name: "Biuret", lore: "", video: "m-IzBxFa8yg" }, { name: "Kishra", lore: "", video: "eIW0i5tch1E" }],
      fun: [{ name: "Fubarius(Huntology)", lore: "", video: "k5DdYPLoItU" }]
    },
    rogue: {
      skill: [{ name: "Cielz", lore: "", video: "qN9GtoGnTxc" }, { name: "Corrupt", lore: "", video: "CkRIrlmQRYQ" }, { name: "Ming", lore: "", video: "aDXXr3ad3is" }, { name: "Happyminti", lore: "", video: "YvQoYMq8_Ng" }, { name: "Oozo", lore: "", video: "1C7Uvt_0oYs" }],
      fun: [{ name: "Caen", lore: "", video: "CGZiwuUPFMo" }, { name: "Perkulator ", lore: "", video: "ID192rw5Whw" }, { name: "Grim", lore: "", video: "oWNt_8xcOZw" }]
    },
    priest: {
      skill: [{ name: "There are no honorable priests apparently", lore: "", video: null }],
      fun: [{ name: "There are no honorable priests apparently", lore: "", video: null }]
    },
    shaman: {
      skill: [],
      fun: [{ name: "Arashmano", lore: "", video: "8-w9Wl8v6ZA" }]
    },
    mage: {
      skill: [{ name: "Drifting", lore: "", video: "VXh_kZZ-GQo" }, { name: "Zachary", lore: "", video: "ohTYLIi1ghY" }, { name: "Gameking", lore: "", video: "RfY8Egsd6C8" }, { name: "Alca", lore: "", video: "MMnmuU8mOsw" }, { name: "Vurtne", lore: "", video: "k5Wieh9MMmc" }],
      fun: [{ name: "Zelta", lore: "", video: "WYSbkW__6MI" }, { name: "Faxmonkey", lore: "", video: "3O_pNDc73MM" }, { name: "Voidim", lore: "", video: "fSn46eGGW7s" }, { name: "Otherguy(Sorrow Hill)", lore: "", video: "2FwMRW1ra0E" }]
    },
    warlock: {
      skill: [{ name: "Shining", lore: "", video: "SqlJUxRd9WU" }, { name: "May", lore: "", video: "fwvpcN72K98" }, { name: "Diivil", lore: "", video: "BV5iAVmiqF8" }],
      fun: []
    },
    druid: {
      skill: [{ name: "Unstoppable", lore: "", video: "_QLmuHDy0Qs" }, { name: "Azgaz", lore: "", video: "xlXOnYi5tAU" }],
      fun: []
    }
  };

  let currentClass = "warrior";
  let currentMode = "skill";
  let requestedSrc = "";
  let requestedAnimation = "Stand";
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
    // Round to the nearest half-star (10-point scale, so nearest 0.5)
    // and build 10 individual star spans, each explicitly full, half,
    // or empty -- rather than one string of glyphs -- so a rating
    // like 7.5 renders a genuine half-filled 8th star instead of
    // rounding up to a full one.
    const clamped = Math.min(10, Math.max(0, parseFloat(score)));
    const rounded = Math.round(clamped * 2) / 2;
    let stars = "";
    for (let i = 1; i <= 10; i++) {
      let state = "empty";
      if (rounded >= i) state = "full";
      else if (rounded >= i - 0.5) state = "half";
      stars += `<span class="star star-${state}">★</span>`;
    }

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

    applyVideoId(data.video || null);

    modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === currentMode));
    classButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.class === currentClass));
  }

  // ---------------------------------------------------------------
  // Embedded video for the current class/mode, using the YouTube
  // IFrame API rather than a plain <iframe src="...">. Two reasons:
  // 1. cueVideoById() loads a video's thumbnail/metadata and gets it
  //    ready to play WITHOUT autoplaying it -- a plain iframe with
  //    ?autoplay=0 still sometimes autoplays depending on browser/
  //    embed settings, whereas "cue" (vs. "load") is explicitly the
  //    non-autoplaying variant.
  // 2. onStateChange lets us detect actual play/pause state, which
  //    drives the fade-in-when-playing behavior in style.css (see
  //    ".video-stage.playing"), not just hover.
  //
  // "Loading in the background" for a YouTube embed doesn't map onto
  // the same technique as preloading an image or .glb file -- you
  // can't pre-fetch a video's bytes without a player instance, and
  // instantiating 18 hidden players (one per class/mode) would be
  // wasteful and could itself trigger unwanted playback. The
  // equivalent here is starting the IFrame API script loading
  // immediately on page load (see loadYouTubeApi() near the bottom of
  // this file) rather than waiting for any interaction, so the player
  // itself is ready well before the visitor hovers or clicks it.
  // ---------------------------------------------------------------
  let ytPlayer = null;
  let pendingVideoId; // set if a class/mode is selected before the API finishes loading

  function applyVideoId(videoId) {
    if (videoStage) videoStage.classList.remove("playing");

    if (!ytPlayer || typeof ytPlayer.cueVideoById !== "function") {
      pendingVideoId = videoId;
      return;
    }

    if (videoId) {
      if (videoMissing) videoMissing.classList.remove("visible");
      ytPlayer.cueVideoById(videoId);
    } else {
      if (videoMissing) videoMissing.classList.add("visible");
      if (typeof ytPlayer.stopVideo === "function") ytPlayer.stopVideo();
    }
  }

  function initYouTubePlayer() {
    if (!window.YT || !window.YT.Player || !document.getElementById("videoFrame")) return;

    ytPlayer = new YT.Player("videoFrame", {
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: () => {
          if (pendingVideoId !== undefined) {
            applyVideoId(pendingVideoId);
            pendingVideoId = undefined;
          }
        },
        onStateChange: (event) => {
          if (!videoStage || !window.YT) return;
          videoStage.classList.toggle("playing", event.data === YT.PlayerState.PLAYING);
        }
      }
    });
  }

  function loadYouTubeApi() {
    if (window.YT && window.YT.Player) {
      initYouTubePlayer();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initYouTubePlayer;
  }

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

  // ---------------------------------------------------------------
  // Honorable Mentions scene. Slides in/out via the "honorable-open"
  // class on <body> (see style.css for the actual slide transition).
  // Clicking a class in the vertical icon column renders that class's
  // HONORABLE_MENTIONS entries into the Fun (left) and Skill (right)
  // lists. Clicking a name expands it in place to reveal its lore
  // text and (if set) an embedded video -- built as a plain iframe
  // rather than the YouTube IFrame API used on the main scene, since
  // there can be many of these and only ever one is expanded at a
  // time, so the simpler approach is enough here. The iframe's src is
  // only set when an entry is expanded (never before), which means
  // nothing autoplays and nothing loads until it's actually opened.
  // ---------------------------------------------------------------
  function renderHonorableList(container, entries) {
    if (!container) return;

    if (!entries || entries.length === 0) {
      container.innerHTML = '<p class="honorable-placeholder">No entries yet.</p>';
      return;
    }

    container.innerHTML = entries
      .map((entry, i) => {
        const hasLore = entry.lore && entry.lore.trim();
        const hasVideo = !!entry.video;
        return (
          `<div class="honorable-entry" data-index="${i}">` +
          `<button type="button" class="honorable-entry-name">${escapeHtml(entry.name)}</button>` +
          `<div class="honorable-entry-details">` +
          (hasLore ? `<p class="honorable-entry-lore">${escapeHtml(entry.lore)}</p>` : "") +
          (hasVideo ? `<div class="honorable-entry-video" data-video-id="${escapeHtml(entry.video)}"></div>` : "") +
          (!hasLore && !hasVideo ? `<p class="honorable-entry-lore">No details added for this entry yet.</p>` : "") +
          `</div>` +
          `</div>`
        );
      })
      .join("");
  }

  function renderHonorableLists(className) {
    const data = HONORABLE_MENTIONS[className];
    if (!data) return;
    renderHonorableList(honorableListFun, data.fun);
    renderHonorableList(honorableListSkill, data.skill);
  }

  // Expand/collapse entries via event delegation, since the list
  // contents are rebuilt from scratch every time a class is picked.
  [honorableListFun, honorableListSkill].forEach((list) => {
    if (!list) return;
    list.addEventListener("click", (e) => {
      const nameBtn = e.target.closest(".honorable-entry-name");
      if (!nameBtn) return;

      const entry = nameBtn.closest(".honorable-entry");
      const alreadyOpen = entry.classList.contains("expanded");

      // Only one entry open at a time within this list.
      list.querySelectorAll(".honorable-entry.expanded").forEach((el) => el.classList.remove("expanded"));

      if (alreadyOpen) return;

      entry.classList.add("expanded");

      const videoEl = entry.querySelector(".honorable-entry-video");
      if (videoEl && !videoEl.dataset.loaded) {
        const videoId = videoEl.dataset.videoId;
        videoEl.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" title="Honorable mention video" frameborder="0" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
        videoEl.dataset.loaded = "true";
      }
    });
  });

  honorableClassButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      honorableClassButtons.forEach((b) => b.classList.toggle("active", b === btn));
      renderHonorableLists(btn.dataset.class);
    });
  });

  if (honorableBtn) {
    honorableBtn.addEventListener("click", () => {
      body.classList.add("honorable-open");
    });
  }

  if (honorableBackBtn) {
    honorableBackBtn.addEventListener("click", () => {
      body.classList.remove("honorable-open");
    });
  }

  updateView();
  loadYouTubeApi();
})();