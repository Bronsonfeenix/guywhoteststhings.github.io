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
      skill: { name: "Thoradin Ironhide", text: "A veteran of a hundred battles, trusting steel and discipline over magic.", model: "models/warrior-skill.glb", lore: "Add elegant lore text for warrior / skill here." },
      fun:   { name: "Sir Punches-A-Lot", text: "Solves every problem by hitting it until it stops being a problem.", model: "models/warrior-fun.glb", lore: "Add elegant lore text for warrior / fun here." }
    },
    paladin: {
      skill: { name: "Aldrena Lightbringer", text: "Channels the Light to shield allies and smite those who threaten them.", model: "models/paladin-skill.glb", lore: "Add elegant lore text for paladin / skill here." },
      fun:   { name: "Captain Sparklefist", text: "Fights crime with a glowing hammer and an unshakeable sense of optimism.", model: "models/paladin-fun.glb", lore: "Add elegant lore text for paladin / fun here." }
    },
    hunter: {
      skill: { name: "Kelthir Swiftarrow", text: "Tracks prey across any terrain, striking from a distance before it knows he's there.", model: "models/hunter-skill.glb", lore: "Add elegant lore text for hunter / skill here." },
      fun:   { name: "Bowzo the Pet Collector", text: "Has more animal friends than actual friends, and is fine with that.", model: "models/hunter-fun.glb", lore: "Add elegant lore text for hunter / fun here." }
    },
    rogue: {
      skill: { name: "Vex Nightshade", text: "Moves unseen through shadow, striking once and vanishing before the echo fades.", model: "models/rogue-skill.glb", lore: "Early attempts at 5-8ing warriors and gouging blinks (techniques that were definitely not standard at the time) are some of the standouts here, add his fairly decent movement and you end up with a very well rounded rogue." },
      fun:   { name: "Sticky Fingers Sam", text: "Definitely didn't take your coin purse. Definitely.", model: "models/rogue-fun.glb", lore: "Add elegant lore text for rogue / fun here." }
    },
    priest: {
      skill: { name: "Sister Elowen", text: "Devoted to the Light, mending wounds others thought beyond saving.", model: "models/priest-skill.glb", lore: "Add elegant lore text for priest / skill here." },
      fun:   { name: "Bandage McHealsalot", text: "Heals first, asks questions never.", model: "models/priest-fun.glb", lore: "Add elegant lore text for priest / fun here." }
    },
    shaman: {
      skill: { name: "Grondar Stormcaller", text: "Speaks with wind, earth, fire, and water, and asks them politely for favors.", model: "models/shaman-skill.glb", lore: "Add elegant lore text for shaman / skill here." },
      fun:   { name: "Sham the Salamander", text: "Talks to lightning bolts like they're old friends. They talk back.", model: "models/shaman-fun.glb", lore: "Add elegant lore text for shaman / fun here." }
    },
    mage: {
      skill: { name: "Y'sera Frostweave", text: "Bends raw arcane energy into precise, devastating shapes.", model: "models/mage-skill.glb", lore: "Add elegant lore text for mage / skill here." },
      fun:   { name: "Poof the Portal Guy", text: "Can teleport across the continent but still loses their car keys.", model: "models/mage-fun.glb", lore: "Add elegant lore text for mage / fun here." }
    },
    warlock: {
      skill: { name: "Malgrathe the Bound", text: "Trades in pacts and shadow, commanding forces most would flee from.", model: "models/warlock-skill.glb", lore: "Add elegant lore text for warlock / skill here." },
      fun:   { name: "Impy McDemonface", text: "Summoned a demon mostly for the company.", model: "models/warlock-fun.glb", lore: "Add elegant lore text for warlock / fun here." }
    },
    druid: {
      skill: { name: "Fernwhisper", text: "Shifts between forms to protect the balance between the wild and the world.", model: "models/druid-skill.glb", lore: "Add elegant lore text for druid / skill here." },
      fun:   { name: "Bear-ly Trying", text: "Turns into a bear to avoid awkward conversations.", model: "models/druid-fun.glb", lore: "Add elegant lore text for druid / fun here." }
    }
  };

  let currentClass = "warrior";
  let currentMode = "skill";
  let requestedSrc = "";

  function updateView() {
    const data = CLASS_DATA[currentClass][currentMode];

    body.dataset.class = currentClass;
    body.dataset.mode = currentMode;

    classText.textContent = data.text;
    nameInput.value = data.name;
    loreText.textContent = data.lore;

    requestedSrc = data.model;
    modelPlaceholder.classList.remove("visible");
    placeholderPath.textContent = data.model;
    modelViewer.setAttribute("src", data.model);

    modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === currentMode));
    classButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.class === currentClass));
  }

  modelViewer.addEventListener("error", (event) => {
    if (modelViewer.getAttribute("src") === requestedSrc) {
      modelPlaceholder.classList.add("visible");
    }
  });

  modelViewer.addEventListener("load", () => {
    if (modelViewer.getAttribute("src") === requestedSrc) {
      modelPlaceholder.classList.remove("visible");
    }
  });

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
