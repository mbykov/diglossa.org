
import _ from "lodash"
import { anthrax } from "@mbykov/anthrax"
import { getTrns } from "@mbykov/anthrax/getTrns"
// import { createDBs } from "@mbykov/anthrax/createDBs"
import { cleanString } from "@mbykov/anthrax/cleanString"
// import { odicts } from "$lib/shared.svelte";

const log = console.log

export const load = async ({ url, params }) => {
    let wf = cleanString(params.wf)

    log('___________________________SERV PARAMS', params)
    log('___________________________SERV URL', url)
    // wf = wf + '?kuku=7'

    let chains = await anthrax(wf)

    let cdicts = _.flatten(chains.map(chain=> chain.cdicts))
    // console.log('____cdicts', cdicts)
    let trnsdicts = await getTrns(cdicts)
    // log('____TRNS', trnsdicts.length)

    // let dictkeys = odicts.current.map(dict=> dict.key)
    // log('____ODICT KEYS', dictkeys)

    // https://stackoverflow.com/questions/52972254/js-es6-how-to-sort-array-by-own-template
    let cdct = {
        rdict: '',
        trns: [
            {order: 1, dname: 'wkt',trns},
            {order: 2, dname: 'lsj',trns},
        ]
    }

    for (let chain of chains) {
        for (let cdict of chain.cdicts) {
            // let pos = posByCdict(cdict)
            cdict.trn = {}

            let tdicts = trnsdicts.filter(tdict=> tdict.dict == cdict.dict && tdict.rdict == cdict.rdict && tdict.pos == cdict.pos)
            for (let tdict of tdicts) {
                // log('____tdict.dname', tdict.dname)
                cdict.trn[tdict.dname] = tdict.trns
            }
            // console.log('_WF_SERVER_CDICT', wf, cdict)
            delete cdict.trns // TODO: проверить, что нет в chains
        }
    }

    console.log('_WF_SERVER_CHAINS', wf, chains)

    return {
       chains,
        wf
    }
}
