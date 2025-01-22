
import { anthrax } from "@mbykov/anthrax"
// import { createDBs } from "@mbykov/anthrax/createDBs"

export const load = async ({ url, params }) => {
    const wf = params.wf
    // let dnames = ['wkt', 'bbh', 'lsj'] // , 'lsj' , 'bbl'
    // dnames.push('nest')
    // await createDBs(dnames)

    let chains = await anthrax(wf)
    console.log('_WF_SERVER_CHAINS', wf, chains)
    return {
       chains,
        wf
    }
}
