---
title: Overview
nav_order: 1
permalink: /
---

# Music Notation Sounds

Instrument sounds for the [Music Notation](https://dsebastien.github.io/music-notation/) library: one small soundfont per General MIDI program, cut from **GeneralUser GS 2.0.3** by S. Christian Collins. You get them with the npm package [`@dsebastien/music-notation-sounds`](https://www.npmjs.com/package/@dsebastien/music-notation-sounds).

## Why one file per instrument

The whole GeneralUser GS 2.0.3 bank is 30.82 MB. A tab with one guitar part needs a tiny part of it.

So each instrument is a file of its own, and a page loads only the instruments it plays, at the first Play. A steel-string guitar is 112 KB. A grand piano is 392 KB. On a page of chord diagrams without tabs, the library's sample player plays these files without loading alphaTab at all.

Each file also carries its own gain, so a piano and a guitar play at about the same loudness.

The library has no address of its own for these files, and that's on purpose: it doesn't depend on a CDN. You put the folder where you want (your own site, or inside your app) and you tell the library where it is. Without a folder, the soundfont that ships with alphaTab plays, as before. With no soundfont at all, the library's built-in synthesizer plays.

## What is in the `generaluser` folder

- `p000.sf3` to `p127.sf3`: one soundfont per General MIDI program (bank 0).
- `drums.sf3`: the standard drum kit (bank 128, program 0).
- `click.sf3`: the kit's metronome click alone, for scores without drums.
- `index.json`: each program's file. This is what a player reads first.
- `report.json`: for each file, its name, size, loudness and gain.
- `LICENSE.txt`: the license of the bank the files are cut from.

## Sizes

These are the sizes in version 0.1.1.

| File                                                | Size     |
| --------------------------------------------------- | -------- |
| A steel-string guitar (`p025.sf3`)                  | 112 KB   |
| A grand piano (`p000.sf3`)                          | 392 KB   |
| The median instrument                               | 84 KB    |
| All the program files (`p000.sf3` to `p127.sf3`)    | 13.5 MB  |
| `index.json`                                        | 3 KB     |
| The whole GeneralUser GS 2.0.3 bank, for comparison | 30.82 MB |

## Install

```sh
npm install @dsebastien/music-notation-sounds
```

The library lists this package as an optional peer dependency: you only need it if you want these sounds.

- [Usage](usage.md): in an app on Node, Bun or Electron, in an app with a build step, and on a web page.
- [License](license.md): the license of the sounds and the license of the code.
- [Making the files](making-the-files.md): how the files are cut from the bank.

## Links

- [GeneralUser GS](https://www.schristiancollins.com/generaluser), on S. Christian Collins's website, and [its repository](https://github.com/mrbumpy409/GeneralUser-GS).
- [Music Notation](https://dsebastien.github.io/music-notation/), the library that plays these files.
- [The package on npm](https://www.npmjs.com/package/@dsebastien/music-notation-sounds).
- [The repository on GitHub](https://github.com/dsebastien/music-notation-sounds), with the [changelog](https://github.com/dsebastien/music-notation-sounds/blob/main/CHANGELOG.md).
