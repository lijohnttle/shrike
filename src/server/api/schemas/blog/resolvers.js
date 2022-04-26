import {
    ResponseDto,
    BlogPostDto,
    BlogPostResponseDto,
    BlogPostListResponseDto } from '../../../../contracts';
import { getUserAuthenticator, getBlogManager } from '../../../domain';


const queryResolvers = {
    /**
     * Creates a new blog post.
     * @param {any} _ 
     * @param {Object} params 
     * @param {Boolean} params.includeUnpublished 
     * @param {String} params.userToken 
     */
    blogPostList: async (_, params) => {
        try {
            const userContext = getUserAuthenticator().getUserContext(params.userToken);

            const requireAdminRole = params.includeUnpublished;

            if (requireAdminRole) {
                if (!userContext.validateAdminAccess()) {
                    return ResponseDto.failUnauthorized();
                }
            }

            const blogPosts = await getBlogManager().getBlogPostList(params.includeUnpublished, userContext);

            return new BlogPostListResponseDto({ success: true, blogPosts });
        }
        catch (error) {
            console.error(error);

            return ResponseDto.fail('Error occured while retrieving a list of blog posts');
        }
    },
    /**
     * Creates a new blog post.
     * @param {any} _ 
     * @param {Object} params 
     * @param {String} params.slug 
     * @param {String} params.userToken 
     */
    blogPost: async (_, params) => {
        try {
            const userContext = getUserAuthenticator().getUserContext(params.userToken);

            const blogPost = await getBlogManager().getBlogPost(params.slug, userContext);

            if (!blogPost) {
                return ResponseDto.success();
            }

            if (!blogPost.published) {
                if (!userContext.validateAdminAccess(params.userToken)) {
                    return ResponseDto.failUnauthorized();
                }
            }

            return new BlogPostResponseDto({ success: true, blogPost: blogPost });
        }
        catch (error) {
            console.error(error);

            return ResponseDto.fail('Error occured while retrieving a blog post');
        }
    },
};

const mutationResolvers = {
    /**
     * Creates a new blog post.
     * @param {any} _ 
     * @param {Object} params 
     * @param {BlogPostDto} params.blogPost 
     * @param {String} params.userToken 
     */
    createBlogPost: async (_, params) => {
        try {
            const userContext = getUserAuthenticator().getUserContext(params.userToken);

            if (!userContext.validateAdminAccess()) {
                return ResponseDto.failUnauthorized();
            }

            const blogPostManager = getBlogManager();

            await blogPostManager.createBlogPost(params.blogPost, userContext);

            return ResponseDto.success();
        }
        catch (error) {
            console.error(error);

            return ResponseDto.fail('Error occured while creating a blog post');
        }
    },
    /**
     * Updates a blog post.
     * @param {any} _ 
     * @param {Object} params 
     * @param {BlogPostDto} params.blogPost 
     * @param {String} params.userToken 
     */
    changeBlogPost: async (_, params) => {
        try {
            const userContext = getUserAuthenticator().getUserContext(params.userToken);

            if (!userContext.validateAdminAccess()) {
                return ResponseDto.failUnauthorized();
            }

            const blogPostManager = getBlogManager();

            await blogPostManager.updateBlogPost(params.blogPost, userContext);

            return ResponseDto.success();
        }
        catch (error) {
            console.error(error);

            return ResponseDto.fail('Error occured while saving a blog post');
        }
    },
    /**
     * Deletes a blog post.
     * @param {any} _ 
     * @param {Object} params 
     * @param {String} params.blogPostId 
     * @param {String} params.userToken 
     */
    deleteBlogPost: async (_, params) => {
        try {
            const userContext = getUserAuthenticator().getUserContext(params.userToken);

            if (!userContext.validateAdminAccess()) {
                return ResponseDto.failUnauthorized();
            }

            const blogPostManager = getBlogManager();

            await blogPostManager.deleteBlogPost(params.blogPostId, userContext);

            return ResponseDto.success();
        }
        catch (error) {
            console.error(error);

            return ResponseDto.fail('Error occured while saving a blog post');
        }
    },
};


export {
    queryResolvers,
    mutationResolvers,
}
