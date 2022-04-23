import { UserSessionModel } from '../models';
import { BlogPostDto, BlogPostListResponseDto, BlogPostResponseDto } from '../../contracts';
import { queryData } from './api';
import { BlogPostModel } from '../models/BlogPostModel';


/**
 * Fetches a list blog posts.
 * @param {Object} [options] Options of the request.
 * @param {UserSessionModel} [options.userSession] Current user session.
 * @param {Boolean} [options.unpublished] Get unpublished blog posts. {@link options.userSession} is requried.
 * @returns {Promise<UserSessionModel[]>}
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
 * @returns {Promise<UserSessionModel>}
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