import PostRepository from './repositories/BlogRepository';

const resolvers = {
    getBlog: () => ({
        getPosts: async () => await PostRepository.getPosts(),
        getBlogPostPreview: async ({ id }) => await PostRepository.getPostPreview(id),
        getBlogPostPreviewByUrl: async ({ urlSlug }) => await PostRepository.getPostPreviewByUrl(urlSlug),
        getBlogPost: async ({ id }) => await PostRepository.getPost(id),
        getBlogPostByUrl: async ({ urlSlug }) => await PostRepository.getPostByUrl(urlSlug)
    })
};

export { resolvers };