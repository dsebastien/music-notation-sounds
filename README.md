# music-notation-sounds

Instrument sounds for [`@dsebastien/music-notation`](https://github.com/dsebastien/music-notation): one small soundfont per General MIDI program, so a page loads only the instruments it plays.

Status: a private repository, not published to npm yet. See "Before the first release" below.

## What is in `generaluser/`

- `p000.sf3` to `p127.sf3`: one soundfont per General MIDI program (bank 0).
- `drums.sf3`: the standard drum kit (bank 128, program 0).
- `click.sf3`: the kit's metronome click alone, for scores without drums.
- `index.json`: for each file its name, size, loudness and gain.
- `LICENSE.txt`: the license of the bank the files are cut from.

The files are cut from **GeneralUser GS 2.0.3** by S. Christian Collins (<https://github.com/mrbumpy409/GeneralUser-GS>). Its license allows use in software and changes to the bank. Read `generaluser/LICENSE.txt`, and its note on the origin of some samples, before you ship the files in a commercial product.

What was changed:

1. Each preset is in a file of its own, with only its instruments and samples.
2. Samples are compressed to Ogg Vorbis (SoundFont 3). A few stay uncompressed, because alphaTab 1.9.0 does not decode them right.
3. Each file carries a gain, so every instrument plays at about the same loudness (-21 dBFS on a fixed test phrase) in alphaTab. The gain is an attenuation below zero in the preset; other players ignore it.

Sizes: 13.9 MB for the 128 programs. A steel guitar is 110 KB, a grand piano 359 KB, the median instrument 82 KB.

## How to use it

Pass the folder to the library:

```ts
renderTab('tab', source, host, {
    alphaTab,
    assets: {
        font,
        // Plays when the folder can't be read or lacks an instrument.
        soundFont: sonivoxUrl,
        instruments: 'https://your.site/sounds/generaluser'
    }
})
```

The library has no address of its own for these files. A web page names its folder; an app reads the files itself.

On a web page that uses the library's bundles, name the folder in the page options (your own site, or any host your pages can read):

```js
window.musicNotationOptions = { play: { instruments: 'https://your.site/sounds/generaluser' } }
```

An app on Node, Bun or Electron reads them from this package, with no network:

```ts
import { generaluser } from '@dsebastien/music-notation-sounds/node'

renderTab('tab', source, host, { alphaTab, assets: { font, soundFont, instruments: generaluser } })
```

An app with a build step can embed only the files it wants (for chord diagrams: `p025.sf3`, `p028.sf3`, `p000.sf3`, `click.sf3` and `index.json`, about 540 KB) and pass a function that gives their bytes: `instruments: (file) => Promise.resolve(embedded[file] ?? null)`.

## How the files are made

In the `music-notation` repository, with ffmpeg on the PATH:

```
bun scripts/sounds/split-soundfont.ts <GeneralUser-GS.sf2> <out folder> --name "GeneralUser GS" --version 2.0.3
```

The script checks every compressed sample in alphaTab against its uncompressed form, and every program against the whole bank.

## Before the first release

1. Decide on the license question (see the design ticket, music-notation #124).
2. Listen: the compressed files against the whole bank, and the levels across instruments.
3. Make the repository public, then `npm publish --access public`.
4. In the library, add this package as an optional peer dependency (as alphaTab is).
5. Put the `generaluser` folder on the host your web pages read, and name it in their options.
