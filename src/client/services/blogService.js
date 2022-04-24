import { AttachmentModel, BlogPostModel, UserSessionModel } from '../models';
import { BlogPostListResponseDto, BlogPostResponseDto, ResponseDto } from '../../contracts';
import { queryData } from './api';
import { toBase64 } from '../utils/filesystem';;


/**
 * Returns the list of attachments ready to upload.
 * @param {BlogPostModel} blogPost
 * @returns {Promise<AttachmentModel[]>} 
 */
const prepareAttachmentsToUpload = async (blogPost) => {
    if (!blogPost.attachments || blogPost.attachments.length === 0) {
        return [];
    }

    const result = [];

    for (let attachment of blogPost.attachments) {
        let newAttachment = new AttachmentModel(attachment);

        if (newAttachment.file) {
            newAttachment.data = await toBase64(newAttachment.file);
        }

        result.push(newAttachment);
    }

    return result;
}

/**
 * Fetches a list blog posts.
 * @param {Object} [options] Options of the request.
 * @param {UserSessionModel} [options.userSession] Current user session.
 * @param {Boolean} [options.unpublished] Get unpublished blog posts. {@link options.userSession} is requried.
 * @returns {Promise<BlogPostModel[]>}
 */
export const fetchBlogPostList = async (options) => {
    const response = await queryData(`
        query {
            blogPostList(
                includeUnpublished: ${!!options?.unpublished},
                accessToken: "${options?.userSession?.token || ''}")
            {
                success
                blogPosts {
                    title
                    slug
                    description
                    createdOn
                    updatedOn
                    publishedOn
                    published
                }
                errorMessage
            }
        }
    `);

    /**
     * @type {BlogPostListResponseDto}
     */
    const message = response.blogPostList;

    if (message) {
        if (message.success) {
            return message.blogPosts.map(dto => BlogPostModel.createFromDto(dto));
        }
        else {
            throw new Error(message.errorMessage);
        }
    }
    else {
        throw new Error('Server returned empty result');
    }
};

/**
 * Fetches a blog post.
 * @param {string} slug The URL slug of a blog post.
 * @param {Object} [options] Options of the request.
 * @param {UserSessionModel} [options.userSession] Current user session.
 * @returns {Promise<BlogPostModel>}
 */
export const fetchBlogPost = async (slug, options) => {
    const response = await queryData(`
        query {
            blogPost(
                slug: "${slug}",
                accessToken: "${options?.userSession?.token || ''}")
            {
                success
                blogPost {
                    id
                    title
                    content
                    slug
                    description
                    createdOn
                    updatedOn
                    publishedOn
                    published
                }
                errorMessage
            }
        }
    `);

    /**
     * @type {BlogPostResponseDto}
     */
    const message = response.blogPost;

    if (message) {
        if (message.success) {
            return BlogPostModel.createFromDto(message?.blogPost);
        }
        else {
            throw new Error(message.errorMessage);
        }
    }
    else {
        throw new Error('Server returned empty result');
    }
};

/**
 * Saves a blog post.
 * @param {BlogPostModel} blogPost 
 * @param {Object} [options] Options of the request.
 * @param {UserSessionModel} [options.userSession] Current user session.
 * @returns {Promise}
 */
export const saveBlogPost = async (blogPost, options) => {
    const attachments = await prepareAttachmentsToUpload(blogPost);

    const response = await queryData(`
        mutation {
            editBlogPost(
                blogPost: {
                    id: "${blogPost.id}",
                    title: "${blogPost.title}",
                    slug: "${blogPost.slug}",
                    description: "${blogPost.description}",
                    content: "${blogPost.content}",
                    published: ${blogPost.published},
                    attachments: [
                        ${attachments.map(attachment => {
                            return `{
                                path: "${attachment.path}",
                                size: ${attachment.size},
                                data: "${attachment.data}"
                            }`;
                        }).join(', ')}
                    ]
                },
                accessToken: "${options.userSession.token}")
            {
                success
                errorMessage
            }
        }
    `);

    /**
     * @type {ResponseDto}
     */
     const message = response.editBlogPost;

     if (message) {
        if (message.success) {
            return;
        }
        else {
            throw new Error(message.errorMessage);
        }
    }
    else {
        throw new Error('Server returned empty result');
    }
};

/**
 * Saves a new blog post.
 * @param {BlogPostModel} blogPost 
 * @param {Object} [options] Options of the request.
 * @param {UserSessionModel} [options.userSession] Current user session.
 * @returns {Promise}
 */
export const createBlogPost = async (blogPost, options) => {
    const attachments = await prepareAttachmentsToUpload(blogPost);

    const response = await queryData(`
        mutation {
            createBlogPost(
                blogPost: {
                    title: "${blogPost.title}",
                    slug: "${blogPost.slug}",
                    description: "${blogPost.description}",
                    content: "${blogPost.content}",
                    published: ${blogPost.published},
                    attachments: [
                        ${attachments.map(attachment => {
                            return `{
                                path: "${attachment.path}",
                                size: ${attachment.size},
                                data: "${attachment.data}"
                            }`;
                        }).join(', ')}
                    ]
                },
                accessToken: "${options.userSession.token}")
            {
                success
                errorMessage
            }
        }
    `);

    /**
     * @type {ResponseDto}
     */
     const message = response.createBlogPost;

     if (message) {
        if (message.success) {
            return;
        }
        else {
            throw new Error(message.errorMessage);
        }
    }
    else {
        throw new Error('Server returned empty result');
    }
};

/**
 * Deletes a blog post.
 * @param {String} blogPostId 
 * @param {Object} [options] Options of the request.
 * @param {UserSessionModel} [options.userSession] Current user session.
 * @returns {Promise}
 */
export const deleteBlogPost = async (blogPostId, options) => {
    const response = await queryData(`
        mutation {
            deleteBlogPost(
                blogPostId: "${blogPostId}",
                accessToken: "${options.userSession.token}")
            {
                success
                errorMessage
            }
        }
    `);

    /**
     * @type {ResponseDto}
     */
     const message = response.deleteBlogPost;

     if (message) {
        if (message.success) {
            return;
        }
        else {
            throw new Error(message.errorMessage);
        }
    }
    else {
        throw new Error('Server returned empty result');
    }
};
