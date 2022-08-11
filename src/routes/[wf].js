console.log('_WF.JS')

export const GET = async ({ locals }) => {
    // locals.userid comes from src/hooks.js
    console.log('_WF.JS__ GET')

    console.log('____ GET.JS 200', locals)
    return {
        body: {
            chains: await locals.data
        }
    };

    return {
        status: 'response.status'
    };
};
