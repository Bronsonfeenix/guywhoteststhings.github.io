(function () {
  const body = document.body;
  const raceItems = document.querySelectorAll(".race-rail li");
  const editableFields = document.querySelectorAll("[contenteditable][data-key]");
  const resetBtn = document.getElementById("resetText");

  const DEFAULTS = {};
  editableFields.forEach((el) => {
    DEFAULTS[el.dataset.key] = el.innerHTML;
  });

  // Restore any saved edits.
  editableFields.forEach((el) => {
    const saved = localStorage.getItem("panel:" + el.dataset.key);
    if (saved !== null) el.innerHTML = saved;
  });

  // Save edits as they happen.
  editableFields.forEach((el) => {
    el.addEventListener("input", () => {
      localStorage.setItem("panel:" + el.dataset.key, el.innerHTML);
    });
  });

  resetBtn.addEventListener("click", () => {
    editableFields.forEach((el) => {
      el.innerHTML = DEFAULTS[el.dataset.key];
      localStorage.removeItem("panel:" + el.dataset.key);
    });
  });

  // Race selection swaps the background theme, same as the in-game
  // character-select screen. The info panel's text is left untouched
  // since it's now a freely editable box, not a per-race display.
  raceItems.forEach((li) => {
    li.addEventListener("click", () => {
      raceItems.forEach((other) => other.classList.remove("active"));
      li.classList.add("active");
      body.dataset.race = li.dataset.race;
      localStorage.setItem("selectedRace", li.dataset.race);
    });
  });

  const savedRace = localStorage.getItem("selectedRace");
  if (savedRace) {
    const match = document.querySelector('.race-rail li[data-race="' + savedRace + '"]');
    if (match) match.click();
  }
})();
