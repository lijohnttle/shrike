import { queryData } from './api.js';


async function fetchUserSessions(username, accessToken, dataFetchedCallback) {
    try {
        const response = await queryData(`
            query {
                userSessions(username: "${username}", accessToken: "${accessToken}") {
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

async function deleteUserSessions(ids, accessToken) {
    if (ids.lentgh === 0) {
        return false;
    }

    try {
        const response = await queryData(`
            mutation {
                deleteUserSessions(ids: [${ids.map(id => `"${id}"`).join()}], accessToken: "${accessToken}")
            }
        `);

        return !!response.deleteUserSessions;
    }
    catch (error) {
        console.error(error);

        return false;
    }
}

async function deleteAllUserSessions(accessToken) {
    try {
        const response = await queryData(`
            mutation {
                deleteAllUserSessions(accessToken: "${accessToken}")
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
