//

const log = console.log

export const load = async ({ url, params }) => {

    log('_LOAD EX')
    const paths = import.meta.glob('/src/lib/examples/*.js', { eager: true })
    log('_paths', paths)
    for (const path in paths) {
		const file = paths[path]
        log('_FILE', file)
        log('_prefixes', file.prefixes)
	}
}
