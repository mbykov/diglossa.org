//

import { error } from '@sveltejs/kit'
import { page } from '$app/state';

const log = console.log
log('_ABOUT SERVER')

export async function load({ params }) {
    log('_PAGE', page)
    log('_PAGE.data', page.data())
	try {
		// const post = await import(`../../posts/${params.slug}.md`)
        let post = {default: 'kuku', meta: {m: 'm'}}

		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
