import { BlogPost } from '../../../data/models/blog/BlogPost';
import { getAccessValidator } from '../../../domain';


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

            const blogPosts = rawBlogPosts.map((source) => {
                const result = {
                    id: source._id,
                    title: source.title,
                    slug: source.slug,
                    description: source.description,
                    createdOn: source.createdOn.toUTCString(),
                    updatedOn: source.updatedOn.toUTCString(),
                    publishedOn: source.publishedOn ? source.publishedOn.toUTCString() : null,
                    published: !!source.published
                };

                return result;
            });

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
