import { anthrax } from "/home/michael/greek/anthrax"

export const load = async ({ url, params }) => {
    const wf = params.wf
    console.log('_+PAGE.SERVER WF ', wf)
    let chains = await anthrax(wf)
    console.log('_wf, chains', wf, chains.length)

    let segments = {}
    for (let chain of chains) {
        let scheme = chain.map(seg=> seg.seg).join('-')
        if (!segments[scheme]) segments[scheme] = []
        segments[scheme].push(chain)
    }

    let schemes = []
    for (let chain of chains) {
        let scheme = chain.map(seg=> seg.seg).join('-')
        schemes.push(scheme)
    }

    let chain = chains[0]
    let mainseg = chain.find(seg=> seg.mainseg)
    console.log('_CHAIN', chain)
    let termseg =  chain.find(seg=> seg.indecl)
    let cdicts = mainseg ? mainseg.cdicts : termseg.cdicts
    return {
        // chain,
        cdicts,
        schemes,
        segments,
        chains,
        wf
    }
}
