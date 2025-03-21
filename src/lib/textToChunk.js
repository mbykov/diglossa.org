//

import { locale } from "$lib/shared.svelte";

export function textToChunk(copiedText) {
    let rows = copiedText.trim().split('\n')
    if (!rows.length) return
    let title = rows[0].slice(0, 25)
    if (!title) return
    let now = new Date()
    let date = now.toLocaleDateString(locale.current)

    let newchunk = {date, title, rows, new: true}
    return newchunk
}
