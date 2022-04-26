import { graphqlRequest } from './api.js';


/**
 * Verifies that a user is logged in and their sesion has not expired. 
 * @param {String} userToken User token.
 * @param {*} removeUserSession 
 * @returns 
 */
async function verifyAccessToken(userToken, removeUserSession) {
    const response = await graphqlRequest(`
        query {
            verifyAdminAccess(userToken: "${userToken}") {
                verified
            }
        }
    `);

    const data = response.verifyAdminAccess;

    const isVerified = !!data.verified;

    if (!isVerified) {
        removeUserSession();
    }

    return isVerified;
}

async function signIn(username, password) {
    const response = await graphqlRequest(`
        mutation {
            signIn(credentials: {
                    username: "${username}",
                    password: "${password}"
                    }) {
                username
                token
                message
            }
        }
    `);

    return response.signIn;
};

async function signOut(username, token) {
    const response = await graphqlRequest(`
        mutation {
            signOut(session: {
                    username: "${username}",
                    token: "${token}"
                    })
        }
    `);

    return response.signOut;
};


export {
    verifyAccessToken,
    signIn,
    signOut
};
