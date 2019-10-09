import PostRepository from './repositories/BlogRepository';

const resolvers = {
    getBlog: () => ({
        getPosts: async () => await PostRepository.getPosts(),
        getPostPreview: async ({ id }) => await PostRepository.getPostPreview(id),
        getPostPreviewByUrl: async ({ urlSlug }) => await PostRepository.getPostPreviewByUrl(urlSlug),
        getPost: async ({ id }) => await PostRepository.getPost(id),
        getPostByUrl: async ({ urlSlug }) => await PostRepository.getPostByUrl(urlSlug)
    })
};

export { resolvers };