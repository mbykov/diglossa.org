//
//

import { error } from '@sveltejs/kit'
import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime";
import fse from 'fs-extra'
import { compile } from 'mdsvex';

const log = console.log

export async function load({ params, url }) {
    log('_PAGE params', params)
    let lang = languageTag()
    log('_PAGE languageTag', lang)

    log('_loading', `/sections/about_${lang}.md`)
    // let fname = `http://localhost/sections/about_${lang}.md`
    let fname = `./sections/about_${lang}.md`
    log('_loading fname', fname)

	try {
		// const post = await import(`/sections/about_${lang}.md`)
        let post = fse.readFileSync(fname, "utf8");
        // let post = {default: 'kuku', metadata: {m: 'm'}}
        // let post = fetch(`/sections/about_${lang}.md`)
        // let post = fetch(fname)
        log('_LOAD page.server', post)

        const compiledResponse = await compile(post);
        console.log('compiledResponse is: ', compiledResponse);

        return { content: compiledResponse?.code };



        log('_LOAD post.default', post.default.render)
        log('_BEF CONT')
        let content = post.default //.render//.render()
        log('_LOAD content.render', content)
        log('_BEF data')
        let data = {
			content,
			meta: post.metadata
		}
        log('_LOAD page.server DATA', data)

		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
        log('_LOAD ERR', e)
		error(404, `Could not find ${lang}`)
	}
}
