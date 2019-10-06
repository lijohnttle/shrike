import postStorage from './storage/PostStorage';

const resolvers = {
    getBlogPostPreview: async ({ id }) => await postStorage.getPostPreview(id),
    getBlogPostPreviewByUrl: async ({ urlSlug }) => await postStorage.getPostPreviewByUrl(urlSlug),
    getBlogPost: async ({ id }) => await postStorage.getPost(id),
    getBlogPostByUrl: async ({ urlSlug }) => await postStorage.getPostByUrl(urlSlug)
};

export { resolvers };