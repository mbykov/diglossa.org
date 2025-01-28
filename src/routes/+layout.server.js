import { createDBs } from "@mbykov/anthrax/createDBs"

const log = console.log

export const prerender = true

let dnames = ['wkt', 'bbh', 'lsj'] // , 'lsj' , 'bbl'
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

    // log('_MENU', menu)
    return {
        menu
    }
}
