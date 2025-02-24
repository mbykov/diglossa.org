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

    dnames = dnames.split(',')
    log('_API server dnames', dnames)


    let chains = await anthrax(wf)
    // console.log('____chains', chains)
    let cdicts = _.flatten(chains.map(chain=> chain.cdicts))
    console.log('____cdicts', cdicts)
    let dictkeys = cdicts.map(cdict=> cdict.dict)
    dictkeys = _.uniq(dictkeys)
    console.log('____dictkeys', dictkeys)

    let alltdicts = await getTrns(dictkeys, dnames)
    let rtrns = alltdicts.map(cdict=> cdict.rdict)
    console.log('____rtrns', rtrns)

    let tdicts = alltdicts


    for (let chain of chains) {
        for (let chaincdict of chain.cdicts) {
            chaincdict.trns = []
            let tdicts = alltdicts.filter(tdict=> tdict.dict == chaincdict.dict && tdict.pos == chaincdict.pos)
            for (let tdict of tdicts) {
                chaincdict.trns.push({dname: tdict.dname, trns: tdict.trns})
            }
        }
    }

    console.log('____chains', chains)

    
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
