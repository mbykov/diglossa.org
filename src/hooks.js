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
  if (!params.wf) return response

  let kuku = 'oh-kuku'

  let results = ''
  let wf = params?.wf
  console.log('_params', wf)
  if (!wf) return
  else if (wf == 'examples') results = 'examples'
  // else
  results = await anthrax(wf)

  event.locals.data = JSON.stringify(results)
  event.locals.wf = wf
  response = await resolve(event);
  console.log('_HOOKS RES', wf, results)

  return response;
};
