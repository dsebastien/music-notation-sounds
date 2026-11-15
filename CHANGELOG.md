# Changelog

## 0.1.1 (2026-11-15)

- **Fixed: held notes buzzed in the library's sample player** (music-notation #128). Browsers decode an Ogg Vorbis sample a little shorter than it was, and the end of its loop was lost. Each compressed sample now has a short tail after its end, so nothing of the loop is lost. Cut again with music-notation's `scripts/sounds/split-soundfont.ts`: steel guitar 112 KB, grand piano 392 KB, median instrument 84 KB.

## 0.1.0 (2026-11-15)

- GeneralUser GS 2.0.3, one soundfont per General MIDI program, the drum kit and its click, with a reader for Node, Bun and Electron.
