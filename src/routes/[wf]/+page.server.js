
import _ from "lodash"
import { anthrax } from "@mbykov/anthrax"
import { getTrns } from "@mbykov/anthrax/getTrns"
// import { createDBs } from "@mbykov/anthrax/createDBs"
import { cleanString } from "@mbykov/anthrax/cleanString"
import { odicts } from "$lib/shared.svelte";

const log = console.log

export const load = async ({ url, params }) => {
    let wf = cleanString(params.wf)

    console.log('_WF_SERVER_WF', wf)

    return {
        wf
    }
}
