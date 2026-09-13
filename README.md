# Character Select Page

A character-select-style landing page: pick a class from the row of 9
icons at the top of the screen, and the background, 3D model, name,
and lore text all switch. A "Skill" / "Fun" toggle above the row swaps
in a second, different set of the same for whichever class is
currently selected.

## Files
- `index.html` — structure
- `style.css` — styling, including one background theme per class/mode
  and the class icon row
- `script.js` — `CLASS_DATA` (all the names, lore, videos, models, and
  animations) plus the logic that swaps everything when you click a
  class or a mode, and preloads assets in the background
- `models/` — `.glb` 3D model files
- `icons/` — class icon images
- `images/` — background images per class/mode
- `fonts/` — for the Morpheus font file (see below)

## Reference

**Class icons:** each button shows a real icon image
(`icons/classicon_{class}.png`) inside a thin silver-bordered square.
To change one, just replace the corresponding file in `icons/` — no
code changes needed as long as the filename stays the same.

**Backgrounds:** set per class *and* mode in `style.css`, since Skill
and Fun can each look different for the same class:
```css
[data-class="warrior"][data-mode="skill"] {
  background-image: url("images/warrior-skill.jpg");
  background-size: cover;
  background-position: center;
}
```
Any class/mode combination without its own rule falls back to a
neutral dark backdrop.

**Names, flavor text, and lore:** all in `script.js` under
`CLASS_DATA`. Each class has a `skill` and a `fun` entry with:
- `name` — shown in the read-only name field at the bottom (visitors
  can't edit it)
- `text` — a shorter flavor line (currently empty on every entry; fill
  it in if you want that line to show something)
- `lore` — the longer text shown in the right-hand panel

**Embedded video:** a video player sits on the left side of the
screen for the current class/mode's `video` field (the id from the
YouTube URL, e.g. `"dQw4w9WgXcQ"`). It's faded to low opacity until
you hover over it or start playing it (it stays fully visible while
actually playing, even after your mouse leaves). It never autoplays —
switching class/mode loads the new video's thumbnail via YouTube's
"cue" API, ready to play on click, rather than starting it
automatically. If `video` is `null`, the box shows "No video has been
set for this class / mode yet." instead of an empty player.

**3D models + animations:** each entry points at
`models/{class}-{mode}.glb` and names which animation clip to play via
`animation` (defaults to `"Stand"`). If a model doesn't have a clip by
that name, the code automatically tries a few common alternates
("Idle", "Stand1", etc.), and if none of those match either, it plays
the file's first animation and logs a console warning listing that
file's actual animation names — check DevTools → Console if a
character is playing the wrong animation. Any class/mode without a
model file yet shows a dashed placeholder box with the expected path.

**Morpheus font:** `.lore-text` is set to use "Morpheus" (the
blackletter-style font used in WoW's UI), which isn't available via
Google Fonts or any CDN — it's shareware, free for personal use only.
To enable it:
1. Download it (search "Morpheus font Kiwi Media").
2. Put the file at `fonts/Morpheus.ttf`.
3. It should just work — the `@font-face` rule in `style.css` is
   already active and pointing at that path. If it doesn't show up,
   check the Network tab in DevTools for a 404 on `Morpheus.ttf` —
   that usually means a filename/case mismatch or the file didn't get
   pushed to the repo.
Until the font file is present, `.lore-text` falls back to EB
Garamond automatically.

**Preloading:** on page load, once the first model (Warrior/Skill)
finishes loading, the page automatically starts fetching every other
model and background image in the background — no clicking required
for them to warm up. This means the very first visit downloads
everything eventually, so if your `.glb` files are large, keeping them
compressed (see below) matters more than it otherwise would.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Add `index.html`, `style.css`, `script.js`, and the `models/`,
   `icons/`, `images/`, and `fonts/` folders to the repo root — or into
   a `/docs` folder if you prefer.
3. Commit and push.
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a
   branch", pick your branch (usually `main`) and the folder (`/` or
   `/docs`), then save.
6. GitHub will give you a URL like `https://yourusername.github.io/yourrepo/`
   within a minute or two.

No build step is required — this is plain HTML/CSS/JS. GitHub Pages'
filesystem is case-sensitive, so double check filenames/folders match
exactly what's referenced in the code if something 404s.

**Keeping `.glb` files small:** try [gltf.report](https://gltf.report/)
(drag-and-drop optimizer, nothing uploaded anywhere) or the
`gltf-transform` CLI (`npm install -g @gltf-transform/cli`, then
`gltf-transform optimize in.glb out.glb`) — texture compression is
usually where the biggest size wins are.