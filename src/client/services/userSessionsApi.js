import { graphqlRequest } from './api.js';


async function fetchUserSessions(username, userToken, dataFetchedCallback) {
    try {
        const response = await graphqlRequest(`
            query {
                userSessions(username: "${username}", userToken: "${userToken}") {
                    success
                    payload {
                        id
                        username
                        expired
                        updatedOn
                    }
                    error {
                        message
                    }
                }
            }
        `);

        const data = response.userSessions;

        if (data.success) {
            dataFetchedCallback(data.payload || []);
        }
        else {
            throw new Error(data.error?.message);
        }
    }
    catch (error) {
        console.error(error);
    }
}

async function deleteUserSessions(ids, userToken) {
    if (ids.lentgh === 0) {
        return false;
    }

    try {
        const response = await graphqlRequest(`
            mutation {
                deleteUserSessions(ids: [${ids.map(id => `"${id}"`).join()}], userToken: "${userToken}")
            }
        `);

        return !!response.deleteUserSessions;
    }
    catch (error) {
        console.error(error);

        return false;
    }
}

async function deleteAllUserSessions(userToken) {
    try {
        const response = await graphqlRequest(`
            mutation {
                deleteAllUserSessions(userToken: "${userToken}")
            }
        `);

        return !!response.deleteAllUserSessions;
    }
    catch (error) {
        console.error(error);

        return false;
    }
}


export {
    fetchUserSessions,
    deleteUserSessions,
    deleteAllUserSessions,
};
