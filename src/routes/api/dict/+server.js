import { anthrax } from "@mbykov/anthrax"
import { getTrns } from "@mbykov/anthrax/getTrns"
import { prefDocs } from "@mbykov/anthrax/prefDocs"
import { cleanString } from "@mbykov/anthrax/cleanString"
import _ from 'lodash'

import { json } from '@sveltejs/kit'

const log = console.log

// DICT / API

export async function GET({url}) {
    let wf = url.searchParams.get('wf')

    log('_prefDocs', prefDocs.length)
    let prefDoc = prefDocs.find(pdoc=> pdoc.dict == wf)

    log('_prefDoc', wf, prefDoc)

    // let alltdicts = await getTrns(dictkeys, dnames)
    // let rtrns = alltdicts.map(cdict=> cdict.rdict)
    // console.log('____rtrns', rtrns)

    let tdicts = alltdicts

    // let json = JSON.stringify({ok: true, wf, chains, tdicts})
    let response = new Response({ok: true})
    let response = new Response(json)
    return response


    // let json = JSON.stringify({ok: true, wf, chains, tdicts})
    // let response = new Response(json)
    // return response

}
