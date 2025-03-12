
import _ from "lodash"
import { anthrax } from "@mbykov/anthrax"
import { cacheAnthrax } from '@mbykov/anthrax/remote';
import { cleanString } from "@mbykov/anthrax/cleanString"
// import { odicts } from "$lib/shared.svelte";
import {oxia, comb, plain, strip} from 'orthos'

const log = console.log

export const load = async ({ url, params }) => {
    let wf = cleanString(params.wf)
    let cwf = oxia(comb(wf))
    // enclitic:::
    log('_WF_SERVER_WF', wf)

    let conts = await cacheAnthrax(cwf)
    log('____+ps, conts', conts)

    for (let cont of conts) {
        // log('____+ps, cdicts', cont.cdicts)
    }

    return {
        wf,
        conts
    }
}
