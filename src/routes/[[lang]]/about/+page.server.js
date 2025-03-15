//

import { error } from '@sveltejs/kit'
// import fse from 'fs-extra'
import { compile } from 'mdsvex';

const log = console.log

export async function load({ params, url }) {
    let section = {}
    let lang = 'ru'
    if (!lang) lang = 'ru'

	try {
        const markdown = (await import(`/sections/about_${lang}.md?raw`)).default;
        section = await compile(markdown)
        // log('_section_', section)

	} catch (e) {
        log('_LOAD ERR', e)
		error(404, `Could not find ${lang}`)
	}
    return { section };

}
