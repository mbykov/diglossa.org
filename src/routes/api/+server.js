//

import { anthrax } from "@mbykov/anthrax"
import { getTrns } from "@mbykov/anthrax/getTrns"
import { cleanString } from "@mbykov/anthrax/cleanString"
import _ from 'lodash'
import { odicts } from "$lib/shared.svelte";

import { json } from '@sveltejs/kit'

const log = console.log

// API

export async function GET({url}) {
	// const posts = await getPosts()
	// return json(posts)

    let dnames = url.searchParams.get('dnames')
    let wf = url.searchParams.get('wf')

    // log('_API server dnames', dnames)
    dnames = dnames.split(',')


    let chains = await anthrax(wf)
    let cdicts = _.flatten(chains.map(chain=> chain.cdicts))
    // console.log('____cdicts', cdicts)
    let dictkeys = cdicts.map(cdict=> cdict.dict)
    dictkeys = _.uniq(dictkeys)

    let trnsdicts = await getTrns(dictkeys, dnames)
    // console.log('____trnsdicts', trnsdicts)

    let tdicts = []

    for (let dname of dnames) {
        for (let tdict of trnsdicts) {
            if (tdict.dname == dname) tdicts.push(tdict)
        }
    }

    // log('_API_SERVER_CHAINS', wf, chains, 'tdicts:', tdicts)

    let json = JSON.stringify({ok: true, wf, chains, tdicts})
    let response = new Response(json)
    return response

}


    // for (let chain of chains) {
    //     for (let cdict of chain.cdicts) {
    //         // let pos = posByCdict(cdict)
    //         cdict.trn = {}

    //         let tdicts = trnsdicts.filter(tdict=> tdict.dict == cdict.dict && tdict.rdict == cdict.rdict && tdict.pos == cdict.pos)
    //         for (let tdict of tdicts) {
    //             // log('____tdict.dname', tdict.dname)
    //             cdict.trn[tdict.dname] = tdict.trns
    //         }
    //         // console.log('_WF_SERVER_CDICT', wf, cdict)
    //         delete cdict.trns // TODO: проверить, что нет в chains
    //     }
    // }
