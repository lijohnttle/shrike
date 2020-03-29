import BlogRepository from './repositories/blogRepository';
import CvRepository from './repositories/cvRepository';

const resolvers = {
    getBlog: () => ({
        getPosts: async () => await BlogRepository.getPosts(),
        getPostPreview: async ({ id }) => await BlogRepository.getPostPreview(id),
        getPostPreviewByUrl: async ({ urlSlug }) => await BlogRepository.getPostPreviewByUrl(urlSlug),
        getPost: async ({ id }) => await BlogRepository.getPost(id),
        getPostByUrl: async ({ urlSlug }) => await BlogRepository.getPostByUrl(urlSlug)
    }),
    getCv: async () => await CvRepository.getCv()
};

export { resolvers };