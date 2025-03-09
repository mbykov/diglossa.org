
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
    // let dnames = _.compact(odicts.current.map(dict=> dict.active ? dict.key : false))
    // log('_WF_SERVER_dnames', dnames)

    let conts = await anthrax(wf)
    // log('____+ps, conts', conts)

    if (!conts) {
        log('_no_conts')
        return {
            wf,
            conts: []
        }
    }

    for (let cont of conts) {
        log('____+ps, cdicts', cont.cdicts)
    }

    let dictkeys = _.flatten(conts.map(cont=> cont.cdicts.map(cdict=> cdict.dict)))
    dictkeys = _.uniq(dictkeys)
    console.log('____dictkeys', dictkeys)

    // let trnsdicts = await getTrns(dictkeys) // , dnames
    // let rtrns = trnsdicts.map(cdict=> cdict.rdict)
    // console.log('____rtrns', rtrns)

    let cachedicts = await getCacheD(dictkeys)
    console.log('____cachedicts', cachedicts)
    let rcacheDs = cachedicts.map(cdict=> cdict.rdict)
    console.log('____rcacheDs', rcacheDs)

    // for (let cont of conts) {
    //     for (let cdict of cont.cdicts) {
    //         cdict.show = true
    //         if (cont.indecl) continue
    //         cdict.trns = []
    //         let tdicts = trnsdicts.filter(tdict=> tdict.dict == cdict.dict && tdict.pos == cdict.pos)
    //         for (let tdict of tdicts) {
    //             cdict.trns.push({dname: tdict.dname, trns: tdict.trns})
    //             // log('_____KKKKK', tdict.dname, tdict.trns)
    //         }
    //     }
    // }

    for (let cont of conts) {
        for (let cdict of cont.cdicts) {
            cdict.show = true
            if (cont.indecl) continue
            if (cont.pos == 'adverb') continue
            cdict.trns = []
            let tdict = cachedicts.find(tdict=> tdict.rdict == cdict.rdict && tdict.pos == cdict.pos)
            // log('__________________TDict', cdict.rdict, cdict.pos, tdict)
            if (!tdict) continue
            // let trns = (tdict) ? tdict.trns : []
            cdict.trns = tdict.trns
        }
    }

    // console.log('____trns_conts', conts)

    // conts = []
    return {
        wf,
        conts
    }
}
