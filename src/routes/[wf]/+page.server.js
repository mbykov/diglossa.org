//

import { anthrax } from "../../../../anthrax"

export const load = async ({ url, params }) => {
    const wf = params.wf
    let chains = await anthrax(wf)
    // console.log('_CHAINS', chains)
    return {
        chains,
        wf
    }
}
