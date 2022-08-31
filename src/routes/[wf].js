// console.log('_WF.JS')

export const GET = async ({ locals }) => {
    // console.log('_WF.JS__ GET')
    // console.log('____ GET.JS 200', locals)

  let chains
  try {
    chains = JSON.parse(locals.data)
  } catch(err) {
    chains = {err: 'kuku'}
  }

  return {
    body: {
      chains: await chains
    }
  };

  // return {
  //   status: 'response.status'
  // };
};
