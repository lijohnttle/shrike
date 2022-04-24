import { graphqlRequest } from './api.js';


async function fetchUserVisits(count, userToken, dataFetchedCallback) {
    try {
        const response = await graphqlRequest(`
            query {
                userVisits(numVisits: ${count}, userToken: "${userToken}") {
                    success
                    userVisits {
                        id
                        path
                        country
                        city
                        count
                        date
                    }
                    errorMessage
                }
            }
        `);

        const data = response.userVisits;

        if (data.success) {
            dataFetchedCallback(data.userVisits || []);
        }
        else {
            throw new Error(data.errorMessage);
        }
    }
    catch (error) {
        console.error(error);
    }
}

async function deleteUserVisits(userVisitIds, userToken) {
    if (userVisitIds.lentgh === 0) {
        return false;
    }

    try {
        const response = await graphqlRequest(`
            mutation {
                deleteUserVisits(userVisitIds: [${userVisitIds.map(id => `"${id}"`).join()}], userToken: "${userToken}")
            }
        `);

        return !!response.deleteUserVisits;
    }
    catch (error) {
        console.error(error);

        return false;
    }
}

async function deleteAllUserVisits(userToken) {
    try {
        const response = await graphqlRequest(`
            mutation {
                clearAllUserVisits(userToken: "${userToken}")
            }
        `);

        return !!response.clearAllUserVisits;
    }
    catch (error) {
        console.error(error);

        return false;
    }
}


export {
    fetchUserVisits,
    deleteUserVisits,
    deleteAllUserVisits,
};
