//
import { getCacheD } from '@mbykov/anthrax/remote';
import { prefDocs } from "@mbykov/anthrax/prefDocs"
import { cleanString } from "@mbykov/anthrax/cleanString"
import { odicts } from "$lib/shared.svelte";
import {oxia, comb, plain, strip} from 'orthos'
import _ from 'lodash'

import { json } from '@sveltejs/kit'

const log = console.log

// DICT / API

export async function GET({url}) {
    let wf = url.searchParams.get('wf')
    let pref = url.searchParams.get('pref')
    let cwf = comb(wf)

    log('_api_SERVER_WF', wf)
    // let dnames = _.compact(odicts.current.map(dict=> dict.active ? dict.key : false))
    // log('_api_SERVER_dnames', dnames)

    let docs = []
    if (pref) {
        log('_prefDocs', prefDocs.length)
        docs = prefDocs.find(pdoc=> pdoc.dict == cwf)
        log('_prefDoc_docs', wf, docs)
    }

    let dictkeys = [cwf]
    let cdicts = await getCacheD(dictkeys)
    console.log('____ap-dict/dictkeys', dictkeys)
    console.log('____ap-dict/cdicts', cdicts)

    // let tdicts = alltdicts

    let json = JSON.stringify({ok: true, wf, cdicts})
    // let json = JSON.stringify({ok: true})
    // let response = new Response({ok: true})
    let response = new Response(json)
    return response


    // let json = JSON.stringify({ok: true, wf, chains, tdicts})
    // let response = new Response(json)
    // return response

}
