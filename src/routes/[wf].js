
export const GET = async ({ locals }) => {
    // console.log('_WF.JS__ GET')
    console.log('____ GET.JS 200 LOCALS', locals)

  let chains, wf
  try {
    chains = JSON.parse(locals.data)
    wf = locals.wf
    console.log('____ GET.JS', chains)
  } catch(err) {
    chains = {err: 'kuku'}
  }

  return {
    body: {
      chains,
      wf
    }
  };
};
