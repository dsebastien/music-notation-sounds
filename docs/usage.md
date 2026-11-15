---
title: Usage
nav_order: 2
---

# Usage

The library reads the files through one option: `assets.instruments` when you call it from your code, `play.instruments` in `window.musicNotationOptions` when a web page uses its bundles. It takes one of two things:

- the URL of a folder (a web page);
- a function `(file) => Promise<Uint8Array | null>` that gives the bytes of one file of the folder, or `null` when it doesn't have it (an app that ships the files).

At the first Play, a tab or a score loads only the files of the programs its tracks play, plus the click (or the drum kit when it has drums). When the folder can't be read, or lacks one of those files, `assets.soundFont` plays instead. The full option is in the library's [JavaScript API](https://dsebastien.github.io/music-notation/api.html).

## In an app on Node, Bun or Electron

The package has a reader for apps that run on Node, Bun or Electron. It reads each file from the package on the disk, so nothing is fetched from a network:

```ts
import { generaluser } from '@dsebastien/music-notation-sounds/node'

renderTab('tab', source, host, {
    alphaTab,
    assets: {
        font,
        // Plays when the folder can't be read or lacks an instrument.
        soundFont,
        instruments: generaluser
    }
})
```

`generaluser` only reads plain file names (`p025.sf3`, `index.json`): nothing outside the `generaluser` folder is read. A file that isn't there gives `null`, so `soundFont` plays.

## In an app with a build step

You don't have to ship every instrument. Embed only the files you need, and pass a function that gives their bytes.

For chord diagrams, that's `p025.sf3` (steel-string guitar), `p028.sf3` (muted guitar, for muted strums), `p000.sf3` (grand piano), `click.sf3` and `index.json`: about 550 KB.

```ts
// The bytes of each file you embed, however your build step gives them to you.
// The package exports every file of the folder: '@dsebastien/music-notation-sounds/generaluser/p025.sf3'.
const embedded: Record<string, Uint8Array> = {
    'index.json': indexJson,
    'p000.sf3': piano,
    'p025.sf3': guitar,
    'p028.sf3': mutedGuitar,
    'click.sf3': click
}

renderTab('tab', source, host, {
    alphaTab,
    assets: {
        font,
        soundFont,
        instruments: (file) => Promise.resolve(embedded[file] ?? null)
    }
})
```

A tab that plays an instrument you didn't embed gets `null` for its file, and `soundFont` plays it.

## On a web page

Put the `generaluser` folder on a host your pages can read: your own site, or any host that allows your pages to read from it (CORS). After `npm install`, the folder is in `node_modules/@dsebastien/music-notation-sounds/generaluser`.

Then name the folder in the page options, before the library's bundles load. On Obsidian Publish, that's at the top of your `publish.js`:

```js
window.musicNotationOptions = {
    play: { instruments: 'https://your.site/sounds/generaluser' }
}
```

What the page loads:

- **Tabs and scores** load only the instruments they play, at the first Play (a guitar is about 110 KB). Diagrams on a page with tabs use them too.
- **Diagrams on a page without tabs** play the same files through the library's sample player, without loading alphaTab. A first chord reads about 115 KB (the folder's `index.json` and one guitar); the piano is read at the first piano diagram. When a file can't be read, or the browser can't decode it, the library's light synthesizer plays.
- **Without `instruments`**, the soundfont that ships with alphaTab plays, as before. It also plays when the folder can't be read or lacks an instrument.

The full set of page options, and the `publish.js` snippet, are in the library's [Obsidian Publish](https://dsebastien.github.io/music-notation/publish.html) guide.

If your site mentions GeneralUser GS, link to its author's website, not to the download files: the author asks for that in its [license](license.md).
