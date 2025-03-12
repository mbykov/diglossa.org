//
import { createDBs } from "@mbykov/anthrax/remote"

const log = console.log

export const prerender = true

let dnames = ['wkt', 'bbh', 'lsj', 'dvr'] // , 'lsj' , 'bbl'
dnames.push('nest')
await createDBs(dnames)

export const load = async ({ url, params }) => {
    const menu = {}
    const paths = import.meta.glob('/src/lib/i18/**/*.js', { eager: true })
    // log('_menu_paths', paths)
    for (const path in paths) {
        // log('_path', path)
        let lang = path.split('i18/')[1].split('/')[0]
        // log('_LANG', lang)
		const file = paths[path]
        // log('_FILE', file)
        // log('_routes', file.routes)
        menu[lang] = file.routes
	}


    let examples = []
    const expaths = import.meta.glob('/src/lib/examples/*.js', { eager: true })
    // log('_example_paths', expaths)
    for (const path in expaths) {
		const file = expaths[path]
        // log('_FILE', file)
        log('_example-title', file.examples.title)
        examples.push(file.examples)
	}


    // log('_MENU', menu)
    return {
        menu,
        examples
    }
}
