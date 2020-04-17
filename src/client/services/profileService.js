import { queryData } from './api';

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

const GET_PROJECTS = `
    {
        getProjects {
            id
            title
            category
            shortDescription
            description
        }
    }
`;

const getCv = async () => (await queryData(GET_CV)).getCv;
const getProjects = async () => (await queryData(GET_PROJECTS)).getProjects;

export default {
    getCv,
    getProjects
};