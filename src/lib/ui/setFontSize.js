//

import { fontsize } from "$lib/shared.svelte";

const log = console.log

export function setfontsize() {
    let fsc = fontsize.current || 'base'

    let oleft = window.document.querySelector('.left')
    for (let style of oleft.classList) {
        if (/text-/.test(style)) oleft.classList.remove(style)
    }
    let style = 'text-' + fsc
    oleft.classList.add(style)
}
