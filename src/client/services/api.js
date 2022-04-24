import axios from 'axios';

const graphqlApi = axios.create({
    baseURL: '/graphql',
});

const queryData = async (query) => {
    const response = await graphqlApi.post('', { query });
    return response.data.data;
}

export { 
    graphqlApi,
    queryData
};