//

// import { anthrax } from "../../../../anthrax"
import { anthrax } from "@mbykov/anthrax"

export const load = async ({ url, params }) => {
    const wf = params.wf
    let chains = await anthrax(wf)
    console.log('_WF_SERVER_CHAINS', chains)
    return {
        chains,
        wf
    }
}
