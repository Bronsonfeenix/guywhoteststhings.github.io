# Character Select Page

A character-select-style landing page: pick a class from the 3x3 grid on
the left, and the background, 3D model, name, and flavor text all
switch. A "Skill" / "Fun" toggle above the grid swaps in a second,
different set of the same for whichever class is currently selected.

## Files
- `index.html` — structure
- `style.css` — styling, including one background theme per class
- `script.js` — all the placeholder data, and the logic that swaps
  everything when you click a class or a mode
- `models/` — `.glb` 3D model files

## Everything here is a placeholder

**Class icons:** each button currently shows a plain circle. To add a
real icon, edit `style.css` and point the relevant class at an image:
```css
.class-btn[data-class="warrior"] .class-icon {
  background-image: url("icons/warrior.png");
}
```
Do this once per class (`warrior`, `paladin`, `hunter`, `rogue`,
`priest`, `shaman`, `mage`, `warlock`, `druid`).

**Backgrounds:** each class has an original gradient backdrop in
`style.css` (search for `[data-class="warrior"]` etc.), standing in for
real artwork. Swap any of them for an image the same way as before:
```css
[data-class="warrior"] {
  background-image: url("images/warrior.jpg");
  background-size: cover;
  background-position: center;
}
```

**Names and flavor text:** open `script.js` and find `CLASS_DATA` near
the top. Every class has a `skill` and a `fun` entry, each with a `name`
and `text` — edit those strings directly. These are **not** editable by
visitors; only you (in the code) can change them, since the page shows
whichever one matches the current class/mode selection.

**3D models:** each class/mode combination expects a file at
`models/{class}-{mode}.glb` — e.g. `models/warrior-skill.glb`,
`models/warrior-fun.glb`. Right now only Shaman has real files
(reusing the model you uploaded, under `models/shaman-skill.glb` and
`models/shaman-fun.glb`). Every other slot points at a file that
doesn't exist yet, so you'll see a dashed placeholder box with the
expected path until you add one — as soon as a matching `.glb` is
dropped into `models/`, it takes over automatically with no code
changes needed.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Add `index.html`, `style.css`, `script.js`, and the `models/` folder
   to the repo root — or into a `/docs` folder if you prefer.
3. Commit and push.
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a
   branch", pick your branch (usually `main`) and the folder (`/` or
   `/docs`), then save.
6. GitHub will give you a URL like `https://yourusername.github.io/yourrepo/`
   within a minute or two.

No build step is required — this is plain HTML/CSS/JS. `.glb` files can
be large; if load time matters, consider compressing them (e.g. with
`gltf-transform` or Blender's glTF export compression) before publishing.
