import { UserSessionModel } from '../models';
import { BlogPostListResponseDto, BlogPostResponseDto, ResponseDto } from '../../contracts';
import { queryData } from './api';
import { BlogPostModel } from '../models/BlogPostModel';


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
    const response = await queryData(`
        mutation {
            editBlogPost(
                blogPost: {
                    id: "${blogPost.id}",
                    title: "${blogPost.title}",
                    slug: "${blogPost.slug}",
                    description: "${blogPost.description}",
                    content: "${blogPost.content}",
                    published: ${blogPost.published}
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
    const response = await queryData(`
        mutation {
            createBlogPost(
                blogPost: {
                    title: "${blogPost.title}",
                    slug: "${blogPost.slug}",
                    description: "${blogPost.description}",
                    content: "${blogPost.content}",
                    published: ${blogPost.published}
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
