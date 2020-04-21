import DataHelper from '../../utils/dataHelper';

export default {
    getCv: async () => await DataHelper.parseDataJson('cv.json'),
    getProjects: async () => (await DataHelper.parseDataJson('projects.json')).projects
};