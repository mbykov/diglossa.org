//
// https://dev.to/rbt/sveltekit-sitemap-b00

import _ from 'lodash'
import fse from 'fs-extra'
import path  from 'path'
import {comb, oxia, plain} from 'orthos'
import { create } from 'xmlbuilder2'

const currentdir = process.cwd()
const log = console.log
const host = 'http://diglossa.org/'

let dirPath = path.resolve(currentdir, '../anthrax.data/bbh')

log('_currentdir', currentdir)
log('_dirPath', dirPath)

run()

async function run() {
    let fns = readDir()
    // fns = fns.slice(500,510)
    log('_FNS', fns.length)

    const sitemap = create({ version: '1.0' }).ele('urlset', {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    });

    fns.forEach((fn) => {
        const ourl = sitemap.ele('url');
        let url = host + fn
        ourl.ele('loc').txt(url);
        ourl.ele('changefreq').txt('weekly');
    });

    const xml = sitemap.end({ prettyPrint: true });
    fse.writeFileSync('./static/sitemap.xml', xml);
    log('_sitemap - ./static/sitemap.xml')
}

function readDir() {
    let fns = fse.readdirSync(dirPath)
    fns = fns.map(fn=> fn.replace('.json', ''))
    fns = fns.filter(fn=> fn[0] != '-')
    return fns
}
