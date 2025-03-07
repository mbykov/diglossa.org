
import _ from "lodash"
import { anthrax } from "@mbykov/anthrax"
import { getTrns } from "@mbykov/anthrax/getTrns"
import { getCacheD } from "@mbykov/anthrax/getCacheD"
// import { createDBs } from "@mbykov/anthrax/createDBs"
import { cleanString } from "@mbykov/anthrax/cleanString"
import { odicts } from "$lib/shared.svelte";

const log = console.log

export const load = async ({ url, params }) => {
    let wf = cleanString(params.wf)

    log('_WF_SERVER_WF', wf)
    let dnames = _.compact(odicts.current.map(dict=> dict.active ? dict.key : false))
    log('_WF_SERVER_dnames', dnames)

    let conts = await anthrax(wf)
    log('____+ps, conts', conts.length)

    if (!conts) {
        log('_no_conts')
        return {
            wf,
            conts: []
        }
    }

    let dictkeys = _.flatten(conts.map(cont=> cont.cdicts.map(cdict=> cdict.dict)))
    dictkeys = _.uniq(dictkeys)
    console.log('____dictkeys', dictkeys)

    let alltdicts = await getTrns(dictkeys, dnames)
    let rtrns = alltdicts.map(cdict=> cdict.rdict)
    // console.log('____rtrns', rtrns)

    let cachedicts = await getCacheD(dictkeys)
    console.log('____cachedicts', cachedicts.length)

    for (let cont of conts) {
        if (cont.indecl) continue
        for (let cdict of cont.cdicts) {
            cdict.trns = []
            let tdicts = alltdicts.filter(tdict=> tdict.dict == cdict.dict && tdict.pos == cdict.pos)
            for (let tdict of tdicts) {
                cdict.show = true
                cdict.trns.push({dname: tdict.dname, trns: tdict.trns})
                // log('_____KKKKK', tdict.dname, tdict.trns)
            }
        }
    }

    // console.log('____trns_conts', conts)

    return {
        wf,
        conts
    }
}
