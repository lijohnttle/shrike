import { graphqlApi } from './api';

const GET_CV = `
    {
        getCv {
            summary
            experience {
                position
                employer
                date
                location
                accomplishments
                tools
                technologies
            }
            education {
                title
                description
                date
                location
            }
        }
    }
`;

async function getCv() {
    const response = await graphqlApi.post('', { query: GET_CV });
    const cv = response.data.data.getCv;
    return cv;
}

export { getCv };