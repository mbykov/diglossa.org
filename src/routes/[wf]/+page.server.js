// import { anthrax } from "/home/michael/greek/anthrax"
import { anthrax } from "../../../../anthrax"

export const load = async ({ url, params }) => {
    const wf = params.wf
    let chains = await anthrax(wf)

    if (!chains.length) {
        // console.log('_no_chains')
        return {
            cdicts: [],
            chains: [],
            wf
        }
    }


    let chain = chains[0]
    let mainseg = chain ? chain.find(seg=> seg.mainseg) : ''
    // ================================= TODO: terms, try - catch
    // console.log('_CHAIN', chain)
    let termseg =  chain ? chain.find(seg=> seg.indecl) : ''
    let cdicts = mainseg ? mainseg.cdicts : termseg.cdicts
    return {
        // cdicts,
        chains,
        wf
    }
}
