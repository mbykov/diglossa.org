// import { anthrax } from "/home/michael/greek/anthrax"
import { anthrax } from "../../../../anthrax"

export const load = async ({ url, params }) => {
    console.log('_server load url, params', url, params)
    const wf = params.wf
    let chains = await anthrax(wf)
    console.log('_NEW CHAINS', chains.length)

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
    let termseg =  chain ? chain.find(seg=> seg.indecl) : ''
    let cdicts = mainseg ? mainseg.cdicts : termseg.cdicts
    return {
        // cdicts,
        // dbs,
        chains,
        wf
    }
}
