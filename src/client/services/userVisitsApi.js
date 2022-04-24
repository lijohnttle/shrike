import { graphqlRequest } from './api.js';


async function fetchUserVisits(count, accessToken, dataFetchedCallback) {
    try {
        const response = await graphqlRequest(`
            query {
                userVisits(numVisits: ${count}, accessToken: "${accessToken}") {
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

async function deleteUserVisits(userVisitIds, accessToken) {
    if (userVisitIds.lentgh === 0) {
        return false;
    }

    try {
        const response = await graphqlRequest(`
            mutation {
                deleteUserVisits(userVisitIds: [${userVisitIds.map(id => `"${id}"`).join()}], accessToken: "${accessToken}")
            }
        `);

        return !!response.deleteUserVisits;
    }
    catch (error) {
        console.error(error);

        return false;
    }
}

async function deleteAllUserVisits(accessToken) {
    try {
        const response = await graphqlRequest(`
            mutation {
                clearAllUserVisits(accessToken: "${accessToken}")
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
