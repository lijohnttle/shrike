import DataHelper from '../../utils/dataHelper.js';

export default {
    getCv: async () => await DataHelper.parseDataJson('cv.json'),
    getProjects: async () => (await DataHelper.parseDataJson('projects.json')).projects
};