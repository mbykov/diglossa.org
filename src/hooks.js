// import * as cookie from 'cookie';
// import { anthrax } from "@mbykov/anthrax"
import { anthrax } from "/home/michael/greek/anthrax"


/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    // const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    // event.locals.userid = cookies['userid'] || crypto.randomUUID();

    console.log('_handle pathname', event.url.pathname)

    let response = await resolve(event);

    const {params} = event
    let wf = params?.wf
    console.log('_params', wf)
    if (!wf) return

    let results = await anthrax(wf)
  // results = [{seg: wf}, {seg:2}]

    event.locals.data = JSON.stringify(results)
    response = await resolve(event);

    console.log('_RES', wf, results)


    return response;
};
