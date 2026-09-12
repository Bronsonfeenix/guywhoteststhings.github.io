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

**Class icons:** each button currently shows a simple line-drawn icon
(an original design — not Blizzard's actual icons, which are
copyrighted) on top of a gradient background tinted with that class's
official WoW color. To use your own icon image instead, open
`index.html`, find that class's button, and replace its `<svg>...</svg>`
block with an `<img>`:
```html
<span class="class-icon">
  <img src="icons/warrior.png" alt="Warrior">
</span>
```
Put the image files in an `icons/` folder next to `index.html`. The
color-gradient background stays either way — it's set separately in
`style.css` under the `.class-btn[data-class="..."] .class-icon` rules,
so an `<img>` will sit on top of it unless you remove that rule for the
classes you've swapped in real icons for.

**Backgrounds:** every class/mode combination currently shows the same
neutral dark backdrop — nothing is set by default. To add your own
image, open `style.css`, find the comment block near the top (search
for "Add your own background image"), and add a rule targeting both
the class and the mode together, since Skill and Fun can each have a
different background for the same class:
```css
[data-class="warrior"][data-mode="skill"] {
  background-image: url("images/warrior-skill.jpg");
  background-size: cover;
  background-position: center;
}
[data-class="warrior"][data-mode="fun"] {
  background-image: url("images/warrior-fun.jpg");
  background-size: cover;
  background-position: center;
}
```
Repeat for whichever of the 9 classes × 2 modes (18 combinations total)
you have art for — any combination left unset just keeps showing the
neutral backdrop.

**Names, flavor text, and lore:** open `script.js` and find `CLASS_DATA`
near the top. Every class has a `skill` and a `fun` entry, each with a
`name`, a short `text`, and a longer `lore` string (shown in the elegant
italic box on the right) — edit those strings directly. Only Rogue /
Skill has real lore text so far; every other slot has a placeholder
reminding you to fill it in. None of these are editable by visitors;
only you (in the code) can change them, since the page shows whichever
one matches the current class/mode selection.

**Accept button + video:** below the lore box, the "Accept" button opens
a fullscreen video overlay. Each `CLASS_DATA` entry has a `video` field
— set it to a YouTube video id (the part after `v=` in a YouTube URL,
e.g. `"dQw4w9WgXcQ"`) to enable it for that class/mode. Only Rogue /
Skill has one set right now (`"VMCDsXwAEK8"`). If `video` is `null`, the
button still opens, but shows "No video has been set for this class /
mode yet." instead — so you always get feedback rather than nothing
happening.

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