import { queryData } from './api.js';


async function verifyAccessToken(accessToken, removeUserSession) {
    const response = await queryData(`
        query {
            verifyAdminAccess(accessToken: "${accessToken}") {
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
    const response = await queryData(`
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
    const response = await queryData(`
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
