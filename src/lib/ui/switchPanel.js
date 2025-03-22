//

export function showLeft() {
    let oleft = document.querySelector('.left')
    if (!oleft) return
    let oright = document.querySelector('.right')
    oleft.classList.remove('hidden')
    oright.classList.add('hidden')
}

export function showRight() {
    let oleft = document.querySelector('.left')
    if (!oleft) return
    let oright = document.querySelector('.right')
    oleft.classList.add('hidden')
    oright.classList.remove('hidden')
}
