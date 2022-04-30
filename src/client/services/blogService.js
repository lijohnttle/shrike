import { AttachmentModel, BlogPostListModel, BlogPostModel, UserSessionModel } from '../models';
import { BlogPostListOptionsDto, BlogPostListResponseDto, BlogPostResponseDto, ResponseDto } from '../../contracts';
import { graphqlRequest } from './api';
import { toBase64 } from '../utils/filesystem';


/**
 * Returns the list of attachments ready to upload.
 * @param {BlogPostModel} blogPost
 * @returns {Promise<AttachmentModel[]>} 
 */
async function prepareAttachmentsToUpload(blogPost) {
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
 * @param {BlogPostListOptionsDto} [options] Options of the request.
 * @returns {Promise<BlogPostListModel>}
 */
export async function fetchBlogPostList (options) {
    const response = await graphqlRequest(`
        query BlogPostList($options: BlogPostListOptions)
        {
            blogPostList(options: $options)
            {
                success
                result {
                    blogPosts {
                        title
                        slug
                        description
                        descriptionImage
                        createdOn
                        updatedOn
                        publishedOn
                        published
                        visits
                    }
                    totalCount
                }
                errorMessage
            }
        }
    `,
    {
        options: options,
    });

    /**
     * @type {BlogPostListResponseDto}
     */
    const message = response.blogPostList;

    if (message) {
        if (message.success) {
            return new BlogPostListModel({
                blogPosts: message.result.blogPosts.map(dto => BlogPostModel.createFromDto(dto)),
                totalCount: message.result.totalCount,
            });
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
export async function fetchBlogPost(slug, options) {
    const response = await graphqlRequest(`
        query BlogPost(
            $slug: String!,
            $userToken: String
        )
        {
            blogPost(
                slug: $slug,
                userToken: $userToken)
            {
                success
                blogPost {
                    id
                    title
                    content
                    slug
                    description
                    descriptionImage
                    createdOn
                    updatedOn
                    publishedOn
                    published
                    attachments {
                        name
                        url
                        size
                        contentType
                    }
                    visits
                }
                errorMessage
            }
        }
    `,
    {
        slug: slug,
        userToken: options?.userSession?.token || '',
    });

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
export async function saveBlogPost(blogPost, options) {
    const attachments = await prepareAttachmentsToUpload(blogPost);

    const response = await graphqlRequest(`
        mutation ChangeBlogPost(
            $id: String!,
            $title: String!,
            $slug: String!,
            $description: String!,
            $descriptionImage: String,
            $content: String!,
            $published: Boolean,
            $attachments: [FileAttachmentInput],
            $userToken: String!)
        {
            changeBlogPost(
                blogPost: {
                    id: $id,
                    title: $title,
                    slug: $slug,
                    description: $description,
                    descriptionImage: $descriptionImage,
                    content: $content,
                    published: $published,
                    attachments: $attachments
                },
                userToken: $userToken)
            {
                success
                errorMessage
            }
        }
    `,
    {
        id: blogPost.id,
        title: blogPost.title,
        slug: blogPost.slug,
        description: blogPost.description,
        descriptionImage: blogPost.descriptionImage,
        content: blogPost.content,
        published: blogPost.published,
        attachments: attachments?.map(attachment => ({
            name: attachment.name,
            size: attachment.size,
            data: attachment.data,
            contentType: attachment.contentType,
        })),
        userToken: options.userSession.token,
    });

    /**
     * @type {ResponseDto}
     */
     const message = response.changeBlogPost;

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
export async function createBlogPost(blogPost, options) {
    const attachments = await prepareAttachmentsToUpload(blogPost);

    const response = await graphqlRequest(`
        mutation CreateBlogPost(
            $title: String!,
            $slug: String!,
            $description: String!,
            $descriptionImage: String,
            $content: String!,
            $published: Boolean,
            $attachments: [FileAttachmentInput],
            $userToken: String!
        )
        {
            createBlogPost(
                blogPost: {
                    title: $title,
                    slug: $slug,
                    description: $description,
                    descriptionImage: $descriptionImage,
                    content: $content,
                    published: $published,
                    attachments: $attachments
                },
                userToken: $userToken)
            {
                success
                errorMessage
            }
        }
    `,
    {
        title: blogPost.title,
        slug: blogPost.slug,
        description: blogPost.description,
        descriptionImage: blogPost.descriptionImage,
        content: blogPost.content,
        published: blogPost.published,
        attachments: attachments?.map(attachment => ({
            name: attachment.name,
            size: attachment.size,
            data: attachment.data,
            contentType: attachment.contentType,
        })),
        userToken: options.userSession.token,
    });

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
export async function deleteBlogPost(blogPostId, options) {
    const response = await graphqlRequest(`
        mutation DeleteBlogPost(
            $blogPostId: String!,
            $userToken: String!
        )
        {
            deleteBlogPost(
                blogPostId: $blogPostId,
                userToken: $userToken)
            {
                success
                errorMessage
            }
        }
    `,
    {
        blogPostId: blogPostId,
        userToken: options.userSession.token,
    });

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
