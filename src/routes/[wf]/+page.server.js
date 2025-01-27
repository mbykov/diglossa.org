
import { anthrax } from "@mbykov/anthrax"
// import { createDBs } from "@mbykov/anthrax/createDBs"
import { cleanString } from "@mbykov/anthrax/cleanString"

export const load = async ({ url, params }) => {
    let wf = params.wf
    // let dnames = ['wkt', 'bbh', 'lsj'] // , 'lsj' , 'bbl'
    // dnames.push('nest')
    // await createDBs(dnames)

    wf = cleanString(wf)

    let chains = await anthrax(wf)
    // console.log('_WF_SERVER_CHAINS', wf, chains)
    return {
       chains,
        wf
    }
}
