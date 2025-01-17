//
import { json } from '@sveltejs/kit'
import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime";

const log = console.log

export async function GET({url}) {
	// const posts = await getPosts()
	// return json(posts)
    log('_server GET', url.searchParams)
    let href = url.searchParams.get('href')
    log('_server href', href)


    // let lang = languageTag()
    let clang = url.searchParams.get('clang')
    log('_clang', clang)

    let fpath = '/sections/' + [href, clang].join('_') + '.md'
    log('_fpath', fpath)

    // let sections = import.meta.glob('/sections/*.md', { eager: true })
	const paths = import.meta.glob('/sections/*.md', { eager: true })
    log('_SCs', paths)

    for (const path in paths) {
        log('_PATH', path)
        const slug = path.split('/').at(-1)?.replace('.md', '')
        log('_slug', slug)

		const file = paths[path]
        log('_SF', file)

		if (file && typeof file === 'object' && 'metadata' in file) {
			const metadata = file.metadata
            log('_metadata', metadata)
			const post = { ...metadata, slug }
            log('_P', post)
			// post.published && posts.push(post)
		}
	}


    let json = JSON.stringify({ok: true})
    let response = new Response(json)
    return response
}
