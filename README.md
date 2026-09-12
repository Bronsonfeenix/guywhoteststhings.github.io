# Character Select Page

A character-select-style landing page: pick a race on the left and the
background theme shifts, similar to the in-game screen. Only one detail
box remains, on the right, with an editable header and body text.

## Files
- `index.html` — structure
- `style.css` — all styling, including one background theme per race
- `script.js` — race switching + saves your edited text in the browser

## About the backgrounds

I can't reproduce Blizzard's actual game screenshots or art assets here —
those are copyrighted. Instead, each race has an original gradient
backdrop in `style.css` (search for `[data-race="orc"]` etc.) that
shifts tone per race the same way the game's background does.

If you own the game and want the real screenshots, it's a one-line swap.
Add your images to an `images/` folder, then in `style.css` replace the
gradient with a `url(...)`, e.g.:

```css
[data-race="orc"] {
  background-image: url("images/orc.jpg");
  background-size: cover;
  background-position: center;
}
```

Do that for each of the 8 `[data-race="..."]` blocks.

## Editing the text box

Click directly on "Orc" or the paragraph beneath it on the live page —
both are editable in place. Edits are saved to the visitor's browser
(`localStorage`), so each visitor can customize their own view, and a
"Reset text" button restores the defaults. This is a static site with no
backend, so edits are local to each browser, not shared between visitors.
If you want the text to be the same for everyone site-wide, just edit the
default text directly in `index.html` instead.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Add these three files (`index.html`, `style.css`, `script.js`) to the
   repo root — or into a `/docs` folder if you prefer.
3. Commit and push.
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a
   branch", pick your branch (usually `main`) and the folder (`/` or
   `/docs`), then save.
6. GitHub will give you a URL like `https://yourusername.github.io/yourrepo/`
   within a minute or two.

No build step is required — this is plain HTML/CSS/JS.
