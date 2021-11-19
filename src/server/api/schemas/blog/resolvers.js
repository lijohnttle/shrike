import { BlogPost } from '../../../data/models/blog/BlogPost';
import { getAccessValidator } from '../../../domain';


const convertToBlogPostMetadata = (rawBlogPost) => {
    const result = {
        id: rawBlogPost._id,
        title: rawBlogPost.title,
        slug: rawBlogPost.slug,
        description: rawBlogPost.description,
        createdOn: rawBlogPost.createdOn.toUTCString(),
        updatedOn: rawBlogPost.updatedOn.toUTCString(),
        publishedOn: rawBlogPost.publishedOn ? rawBlogPost.publishedOn.toUTCString() : null,
        published: !!rawBlogPost.published
    };

    return result;
};


const queryResolvers = {
    blogPostList: async (_, { includeUnpublished, accessToken }) => {

        try {
            if (includeUnpublished) {
                if (!getAccessValidator().validateAdminAccess(accessToken)) {
                    return {
                        success: false,
                        errorMessage: 'Unauthorized acceess'
                    };
                }
            }

            const filter = { };

            if (!includeUnpublished) {
                filter.published = true;
            }

            const rawBlogPosts = await BlogPost.find(filter);

            const blogPosts = rawBlogPosts.map(convertToBlogPostMetadata);

            return {
                success: true,
                blogPosts: blogPosts,
            };
        }
        catch (error) {
            console.error(error);

            return {
                success: false,
                errorMessage: 'Error occured while retrieving a list of blog posts'
            };
        }
    },
    blogPost: async (_, { slug, accessToken }) => {

        try {
            const rawBlogPost = await BlogPost.findOne({ slug: slug });

            if (!rawBlogPost) {
                return {
                    success: true,
                    blogPost: null,
                };
            }

            if (!rawBlogPost.published) {
                if (!accessToken || !getAccessValidator().validateAdminAccess(accessToken)) {
                    return {
                        success: false,
                        errorMessage: 'Unauthorized acceess'
                    };
                }
            }

            return {
                success: true,
                blogPost: {
                    metadata: convertToBlogPostMetadata(rawBlogPost),
                    content: rawBlogPost.content,
                },
            };
        }
        catch (error) {
            console.error(error);

            return {
                success: false,
                errorMessage: 'Error occured while retrieving a blog post'
            };
        }
    },
};

const mutationResolvers = {
    createBlogPost: async (_, { blogPost, accessToken }) => {

        try {
            if (!getAccessValidator().validateAdminAccess(accessToken)) {
                return {
                    success: false,
                    errorMessage: 'Unauthorized acceess'
                };
            }

            const newBlogPost = new BlogPost(blogPost);
            newBlogPost.createdOn = new Date();
            newBlogPost.updatedOn = newBlogPost.createdOn;

            if (blogPost.publish) {
                newBlogPost.publishedOn = newBlogPost.createdOn;
                newBlogPost.published = true;
            }

            await newBlogPost.save();

            return {
                success: true
            };
        }
        catch (error) {
            console.error(error);
            
            return {
                success: false,
                errorMessage: 'Error occured while creating a blog post'
            };
        }
    },
};


export {
    queryResolvers,
    mutationResolvers,
}
