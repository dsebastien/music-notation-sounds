// For apps that run on Node, Bun or Electron: reads an instrument file of this package from the
// disk, so nothing is fetched from a network.
//
//   import { generaluser } from '@dsebastien/music-notation-sounds/node'
//   renderTab('tab', source, host, { alphaTab, assets: { font, soundFont, instruments: generaluser } })
import { readFile } from 'node:fs/promises'

/** Reads one file of a folder of this package; null when it isn't there. */
const reader = (folder) => async (file) => {
    // Only a plain file name: nothing outside the folder is read.
    if (!/^[\w.-]+$/.test(file)) return null
    try {
        return new Uint8Array(await readFile(new URL(`./${folder}/${file}`, import.meta.url)))
    } catch {
        return null
    }
}

/** GeneralUser GS, one soundfont per General MIDI program. */
export const generaluser = reader('generaluser')
