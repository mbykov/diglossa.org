// import { anthrax } from "/home/michael/greek/anthrax"
import { anthrax } from "../../../../anthrax"

export const load = async ({ url, params }) => {
    // console.log('_server load url, params', url, params)
    const wf = params.wf
    let chains = await anthrax(wf)
    console.log('_NEW CHAINS', chains.length)

    if (!chains.length) {
        // console.log('_no_chains')
        return {
            chains: [],
            wf
        }
    }


    return {
        chains,
        wf
    }
}
