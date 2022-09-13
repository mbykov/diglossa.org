import { anthrax } from "/home/michael/greek/anthrax"

export const load = async ({ url, params }) => {
  const wf = params.wf
  console.log('_+PAGE.SERVER WF ', wf)
  let chains = await anthrax(wf)
  console.log('_wf, chains', wf, chains.length)
  let segments = {}
  for (let chain of chains) {
    let segs = chain.map(seg=> seg.seg).join('-')
    segments[segs] = chain
  }

  return {
    segments,
    chains,
    wf
  }
}
