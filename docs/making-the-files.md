---
title: Making the files
nav_order: 4
---

# Making the files

The files are cut from the GeneralUser GS 2.0.3 bank (a SoundFont 2 file) by a script of the [`music-notation`](https://github.com/dsebastien/music-notation) repository: `scripts/sounds/split-soundfont.ts`. The cut files are not in that repository, because the bank has its own license. They live in this package.

## Run the script

In the `music-notation` repository, with [ffmpeg](https://ffmpeg.org) on the PATH:

```sh
bun scripts/sounds/split-soundfont.ts <GeneralUser-GS.sf2> <out folder> --name "GeneralUser GS" --version 2.0.3
```

The other options:

- `--format sf3|sf2`: `sf3` (the default) compresses each sample to Ogg Vorbis with ffmpeg; `sf2` keeps the samples as they are.
- `--quality 4`: the Ogg Vorbis quality to start from.
- `--target -21`: the loudness each instrument is brought to, in dBFS.
- `--reference kit.sf3`: the soundfont whose drum kit sets the loudness of `drums.sf3`.

It writes the files of the [`generaluser` folder](index.md#what-is-in-the-generaluser-folder): `p000.sf3` to `p127.sf3`, `drums.sf3`, `click.sf3`, `index.json` and `report.json`.

## What the script changes

1. **Each preset is in a file of its own**, with only its instruments and samples. That's why a page can load a guitar without the rest of the bank.
2. **Samples are compressed to Ogg Vorbis** (SoundFont 3). A few stay uncompressed, because alphaTab 1.9.0 does not decode them right.
3. **Each compressed sample has a short tail after its end** (since 0.1.1). Browsers decode an Ogg Vorbis sample a little shorter than it was, and the end of its loop was lost: held notes buzzed in the library's sample player. With the tail, nothing of the loop is lost.
4. **Each file carries a gain**, so every instrument plays at about the same loudness in alphaTab.

## The gain

Each program plays a fixed test phrase, and the script brings it to the `--target` loudness: -21 dBFS by default, the median of alphaTab's `sonivox.sf3` on the same phrase. It goes only as far as the peak allows: a full six-note strummed chord, at velocity 100 and full volume, may not go above full scale. That limit comes from the steel-string guitar: brought to the target, it peaked at +5.7 dBFS on a G chord, which clips. The test phrase alone (single notes and one four-note chord) didn't show it.

The drum kit is brought to the loudness of the `--reference` soundfont's kit: `sonivox.sf3` by default, when alphaTab is installed.

The gain is written into each file as an attenuation (a level below zero) in the preset. Other players ignore it. `report.json` lists, for each file, its loudness and the gain written into it.

## The checks

The script checks every compressed sample in alphaTab against its uncompressed form, and every program against the whole bank.
