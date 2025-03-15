//

import { compile } from 'mdsvex';

const log = console.log

export const load = async ({ url, params }) => {
    let examples = []
    let files = []
    // const paths = import.meta.glob('/src/lib/examples/*.md', { eager: true })
    const paths = import.meta.glob('/src/lib/examples/*.md')
    for  (let expath in paths) {
        // log('_expath', expath)
		// let file = paths[path]
        expath += '?raw'
        const markdown = (await import(expath)).default;
        let compiled = await compile(markdown)
        let code = compiled.code
        if (!code) return []
        // log('_compiled', compiled)
        let html = compiled.code.trim().split('</h2>')[1].trim()
        let rows = html.replace(/<p>/g, '').split('</p>').map(row=> row.trim())
        let date = compiled.data.fm.date
        let title = compiled.data.fm.title
        let example = {date, title, rows}
        log('_example', example)
        examples.push(example)
	}
    return {
        examples
    }
}
