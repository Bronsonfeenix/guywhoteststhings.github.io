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
      skill: { name: "Bobo", text: "", model: "models/warrior-skill.glb", lore: "The rest of the skilled section were picked for their individual skill, Bobo however was picked because the demons he chose to fight could have made it to this list on their own (one of them did). By far the cleanest and most impressive warrior at the time, you could easily believe some of these duels were recorded yesterday and not 20 years ago. 9/10", video: "23MOz4cc0Uk" },
      fun:   { name: "S&Q Inc Group PVP", text: "", model: "models/warrior-fun.glb", lore: "One of the classiest PvP videos in all of vanilla, the editing, the soundtrack and the 2vX lens they filmed through, S&Q Inc is nothing if not fun. A shoutout to Wheeliecool & Champ for a similar vibe but for us it's gotta be S&Q Inc.", video: "sHJS1bqu6yw" }
    },
    paladin: {
      skill: { name: "Arthus", text: "", model: "models/paladin-skill.glb", lore: " Is friends with bobo 6/10", video: "S9XitQA-dkE" },
      fun:   { name: "Zalgradis", text: "", model: "models/paladin-fun.glb", lore: "Sketches, engineering, bad voice acting, and a unique playstyle come together in a love letter full of references to other videos of the era", video: "NOXrGmulbMk" }
    },
    hunter: {
      skill: { name: "Junglle", text: "", model: "models/hunter-skill.glb", lore: "If Dysphoria had 1 second of PvP in his video he'd be on this side. 5/10", video: "QrXL4bxtymk" },
      fun:   { name: "Dysphoria", text: "", model: "models/hunter-fun.glb", lore: " A completely fresh soundtrack for the time and a mental that says nothing is impossible Hunter Vs. World is an all time classic series.", video: "7XgF_P9Ddjk" }
    },
    rogue: {
      skill: { name: "Dahis", text: "", model: "models/rogue-skill.glb", lore: "Early attempts at 5-8ing warriors and gouging blinks (techniques that were definitely not standard at the time) are some of the standouts here, add his fairly decent movement and you end up with a very well rounded rogue. 7.5/10", video: "VMCDsXwAEK8" },
      fun:   { name: "Mute (World of Roguecraft)", text: "", model: "models/rogue-fun.glb", lore: "The most influential vanilla PvP videos of all time, if you ever saw someone trying to flex on their enemies while naked, it's probably because of mute. (Released in reverse order, episode 3 was the first in the series)", video: "bqx1CFomKMI" }
    },
    priest: {
      skill: { name: "There are no good priests apparently", text: "", model: "models/priest-skill.glb", lore: "There are no good priests apparently", video: null },
      fun:   { name: "Beckon", text: "", model: "models/priest-fun.glb", lore: "is the Hulksmash of holy priests, sit back, relax, and watch this man cast a 40 second holy fire to take someones head off", video: "x_EgBtUtWBM" }
    },
    shaman: {
      skill: { name: "Nimhabulove", text: "", model: "models/shaman-skill.glb", lore: " Between totems, shocks, healing and damaging spells shaman has a lot of tools at its disposal, our guy uses them all. And yes, that was a deathcoil that he grounded. 6/10", video: "qxMSzBxxesk" },
      fun:   { name: "Cabbarnuke/Unbreakable", text: "", model: "models/shaman-fun.glb", lore: "You have two options here, if you saw Roguecraft and needed more naked pvp Cabbarnuke is your guy, if you're looking for the exact opposite and want to see a man swing a big hammer as hard as he can Unbreakable has got your back", video: "eXE-J13gpNE" }
    },
    mage: {
      skill: { name: "Clazzi", text: "", model: "models/mage-skill.glb", lore: "Crispy movement, cooldown management and a complete confidence in his actions. Perhaps the first known recording of a dirty pop, the opening 1vX is one of the best recorded vanilla fights of all time. 9.5/10", video: "3_Tr5aklJ6U" },
      fun:   { name: "Pathologist", text: "", model: "models/mage-fun.glb", lore: "By far the most unique and creative visual style, Pathologist (Dyf1.6) saw the potential for PvP videos to be more than crit showcases and unedited BG footage, he wanted to make art, not just in video form as half of his soundtracks are his own songs. Had God blessed him with the PvP skill of a Clazzi, he'd be the only name on this list. ", video: "0ZNAWoYEras" }
    },
    warlock: {
      skill: { name: "Lokilo", text: "", model: "models/warlock-skill.glb", lore: "An actual time traveler, completely cool under pressure with impeccable character control and target selection. What he lacks in flashiness he makes up for in pure cleanliness. 9/10", video: "dPJf4Ocjc-8" },
      fun:   { name: "Drakedog", text: "", model: "models/warlock-fun.glb", lore: "Did we mention we're fans of Pathologist? Drakedog, who is probably the most beloved vanilla warlock, having Pathologist edit his video for him was a crossover that came out of nowhere and we're glad it did.", video: "I918N8wUvRs" }
    },
    druid: {
      skill: { name: "Tfo", text: "", model: "models/druid-skill.glb", lore: "Very solid player, he has an exceptional grasp on how to use the utility and strengths of this versatile class. 7.5/10", video: "aX93zH6wJeM" },
      fun:   { name: "N E V E R ", text: "", model: "models/druid-fun.glb", lore: "You thought druids were weak in vanilla? Ferahgo and Boro came together to show you otherwise.", video: "J7DN_w0LQUI" }
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
