(function () {
  const body = document.body;
  const modeButtons = document.querySelectorAll(".mode-btn");
  const classButtons = document.querySelectorAll(".class-btn");
  const modelViewer = document.getElementById("classModel");
  const modelPlaceholder = document.getElementById("modelPlaceholder");
  const placeholderPath = document.getElementById("placeholderPath");
  const classText = document.getElementById("classText");
  const nameInput = document.getElementById("classNameInput");
  const loreText = document.getElementById("loreText");
  const acceptBtn = document.getElementById("acceptBtn");
  const videoModal = document.getElementById("videoModal");
  const videoFrame = document.getElementById("videoFrame");
  const videoFrameWrap = document.getElementById("videoFrameWrap");
  const videoClose = document.getElementById("videoClose");

  // ---------------------------------------------------------------
  // PLACEHOLDER DATA -- everything here is meant to be replaced.
  // For each class, "skill" and "fun" each hold a name, a line of
  // flavor text, and a path to a .glb model. Only Shaman currently
  // has real model files (models/shaman-skill.glb / shaman-fun.glb);
  // every other class points at a file that doesn't exist yet, so a
  // dashed placeholder box appears until you add one at that path.
  // ---------------------------------------------------------------
  const CLASS_DATA = {
    warrior: {
      skill: { name: "Thoradin Ironhide", text: "A veteran of a hundred battles, trusting steel and discipline over magic.", model: "models/warrior-skill.glb", lore: "Add elegant lore text for warrior / skill here.", video: null },
      fun:   { name: "Sir Punches-A-Lot", text: "Solves every problem by hitting it until it stops being a problem.", model: "models/warrior-fun.glb", lore: "Add elegant lore text for warrior / fun here.", video: null }
    },
    paladin: {
      skill: { name: "Aldrena Lightbringer", text: "Channels the Light to shield allies and smite those who threaten them.", model: "models/paladin-skill.glb", lore: "Add elegant lore text for paladin / skill here.", video: null },
      fun:   { name: "Captain Sparklefist", text: "Fights crime with a glowing hammer and an unshakeable sense of optimism.", model: "models/paladin-fun.glb", lore: "Add elegant lore text for paladin / fun here.", video: null }
    },
    hunter: {
      skill: { name: "Kelthir Swiftarrow", text: "Tracks prey across any terrain, striking from a distance before it knows he's there.", model: "models/hunter-skill.glb", lore: "Add elegant lore text for hunter / skill here.", video: null },
      fun:   { name: "Bowzo the Pet Collector", text: "Has more animal friends than actual friends, and is fine with that.", model: "models/hunter-fun.glb", lore: "Add elegant lore text for hunter / fun here.", video: null }
    },
    rogue: {
      skill: { name: "Vex Nightshade", text: "Moves unseen through shadow, striking once and vanishing before the echo fades.", model: "models/rogue-skill.glb", lore: "Early attempts at 5-8ing warriors and gouging blinks (techniques that were definitely not standard at the time) are some of the standouts here, add his fairly decent movement and you end up with a very well rounded rogue.", video: "VMCDsXwAEK8" },
      fun:   { name: "Sticky Fingers Sam", text: "Definitely didn't take your coin purse. Definitely.", model: "models/rogue-fun.glb", lore: "Add elegant lore text for rogue / fun here.", video: null }
    },
    priest: {
      skill: { name: "Sister Elowen", text: "Devoted to the Light, mending wounds others thought beyond saving.", model: "models/priest-skill.glb", lore: "Add elegant lore text for priest / skill here.", video: null },
      fun:   { name: "Bandage McHealsalot", text: "Heals first, asks questions never.", model: "models/priest-fun.glb", lore: "Add elegant lore text for priest / fun here.", video: null }
    },
    shaman: {
      skill: { name: "Grondar Stormcaller", text: "Speaks with wind, earth, fire, and water, and asks them politely for favors.", model: "models/shaman-skill.glb", lore: "Add elegant lore text for shaman / skill here.", video: null },
      fun:   { name: "Sham the Salamander", text: "Talks to lightning bolts like they're old friends. They talk back.", model: "models/shaman-fun.glb", lore: "Add elegant lore text for shaman / fun here.", video: null }
    },
    mage: {
      skill: { name: "Y'sera Frostweave", text: "Bends raw arcane energy into precise, devastating shapes.", model: "models/mage-skill.glb", lore: "Add elegant lore text for mage / skill here.", video: null },
      fun:   { name: "Poof the Portal Guy", text: "Can teleport across the continent but still loses their car keys.", model: "models/mage-fun.glb", lore: "Add elegant lore text for mage / fun here.", video: null }
    },
    warlock: {
      skill: { name: "Malgrathe the Bound", text: "Trades in pacts and shadow, commanding forces most would flee from.", model: "models/warlock-skill.glb", lore: "Add elegant lore text for warlock / skill here.", video: null },
      fun:   { name: "Impy McDemonface", text: "Summoned a demon mostly for the company.", model: "models/warlock-fun.glb", lore: "Add elegant lore text for warlock / fun here.", video: null }
    },
    druid: {
      skill: { name: "Fernwhisper", text: "Shifts between forms to protect the balance between the wild and the world.", model: "models/druid-skill.glb", lore: "Add elegant lore text for druid / skill here.", video: null },
      fun:   { name: "Bear-ly Trying", text: "Turns into a bear to avoid awkward conversations.", model: "models/druid-fun.glb", lore: "Add elegant lore text for druid / fun here.", video: null }
    }
  };

  let currentClass = "warrior";
  let currentMode = "skill";
  let requestedSrc = "";
  let currentVideoId = null;

  function updateView() {
    const data = CLASS_DATA[currentClass][currentMode];

    body.dataset.class = currentClass;
    body.dataset.mode = currentMode;

    if (classText) classText.textContent = data.text;
    if (nameInput) nameInput.value = data.name;
    if (loreText) {
      loreText.textContent = data.lore;
    } else {
      console.warn('script.js expected an element with id="loreText" but did not find one. Make sure index.html, style.css, and script.js are all the latest versions, deployed together.');
    }

    requestedSrc = data.model;
    if (modelPlaceholder) modelPlaceholder.classList.remove("visible");
    if (placeholderPath) placeholderPath.textContent = data.model;
    if (modelViewer) modelViewer.setAttribute("src", data.model);

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

    if (videoModal.requestFullscreen) {
      videoModal.requestFullscreen().catch(() => {});
    }
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove("open");
    videoModal.setAttribute("aria-hidden", "true");
    videoFrame.src = "";
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  if (acceptBtn) acceptBtn.addEventListener("click", openVideoModal);
  if (videoClose) videoClose.addEventListener("click", closeVideoModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal && videoModal.classList.contains("open")) closeVideoModal();
  });

  if (modelViewer) {
    modelViewer.addEventListener("error", () => {
      if (modelPlaceholder && modelViewer.getAttribute("src") === requestedSrc) {
        modelPlaceholder.classList.add("visible");
      }
    });

    modelViewer.addEventListener("load", () => {
      if (modelPlaceholder && modelViewer.getAttribute("src") === requestedSrc) {
        modelPlaceholder.classList.remove("visible");
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
