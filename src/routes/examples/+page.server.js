//

const log = console.log

export const load = async ({ url, params }) => {

    let files = []
    const paths = import.meta.glob('/src/lib/examples/*.js', { eager: true })
    // log('_example_paths', paths)
    for (const path in paths) {
		const file = paths[path]
        // log('_FILE', file)
        log('_examples', file.examples.title)
        files.push(file.examples)
	}

    return {
        files
    }
}
