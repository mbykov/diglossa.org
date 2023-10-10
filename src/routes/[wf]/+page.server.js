//

import { anthrax } from "../../../../anthrax"

export const load = async ({ url, params }) => {
    const wf = params.wf
    let chains = await anthrax(wf)
    return {
        chains,
        wf
    }
}
