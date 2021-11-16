import { BlogPost } from '../data/models/blog/BlogPost.js';
import { getAccessValidator } from '../domain/index.js';

export const typeDef = `
    extend type Query {
        blogPostList(includeUnpublished: Boolean, accessToken: String): BlogPostListResult
    }

    extend type Mutation {
        createBlogPost(blogPost: CreateBlogPostInput!, accessToken: String!): CreateBlogPostResult
    }

    type BlogPostListResult {
        success: Boolean!
        blogPosts: [BlogPostMetadata]
        errorMessage: String
    }

    type BlogPostMetadata {
        id: String!
        title: String!
        slug: String!
        description: String!
        createdOn: String
        updatedOn: String
        publishedOn: String
        published: Boolean
    }

    input CreateBlogPostInput {
        title: String!
        slug: String!
        description: String!
        content: String!
        publish: Boolean
    }

    type CreateBlogPostResult {
        success: Boolean!
        errorMessage: String
    }
`;

export const queryResolvers = {
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

            const blogPosts = await BlogPost.find({ published: true });

            blogPosts.forEach((post) => {
                post.id = post._id;
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

export const mutationResolvers = {
    createBlogPost: async (_, { blogPost, accessToken }) => {

        try {
            if (!getAccessValidator().validateAdminAccess(accessToken)) {
                return {
                    success: false,
                    errorMessage: 'Unauthorized acceess'
                };
            }

            const newBlogPost = new BlogPost(blogPost);
            newBlogPost.


            newBlogPost.createdOn = new Date();
            newBlogPost.updatedUp = newBlogPost.createdOn;

            if (blogPost.publish) {
                newBlogPost.publishedOn = newBlogPost.createdOn;
            }

            console.log(blogPost);

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
