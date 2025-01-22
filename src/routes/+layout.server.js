import { createDBs } from "@mbykov/anthrax/createDBs"

export const load = async ({ url, params }) => {
    let dnames = ['wkt', 'bbh', 'lsj'] // , 'lsj' , 'bbl'
    dnames.push('nest')
    await createDBs(dnames)

}
