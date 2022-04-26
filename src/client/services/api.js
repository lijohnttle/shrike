import axios from 'axios';

const graphqlApi = axios.create({
    baseURL: '/graphql',
});

async function graphqlRequest(query, variables) {
    const response = await graphqlApi.post('', { query, variables });
    return response.data.data;
}

export { 
    graphqlApi,
    graphqlRequest
};