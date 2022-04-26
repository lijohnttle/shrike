import mongoose from 'mongoose';
import { BlogPostDto } from '../../../../contracts';
import { Attachment } from '../../../data/models/Attachment';
import { BlogPost, BlogPostDocument } from '../../../data/models/blog/BlogPost';
import { UserContext } from '../../entities/authentication/UserContext';
import { mapBlogPostDocumentToDto, mapBlogPostDtoToDocument } from './mappers';


class BlogManager {
    /**
     * Returns the list of blog posts.
     * @param {Boolean} showUnpublished
     * @param {UserContext} userContext 
     * @returns {Resolver<BlogPostDto[]>}
     */
    async getBlogPostList(showUnpublished, userContext) {
        const requireAdminRole = showUnpublished;

        if (requireAdminRole) {
            userContext.verifyAdminAccess();
        }

        /** @type {BlogPostDocument[]} */
        const blogPostDocuments = await BlogPost
            .find(
                {
                    published: !showUnpublished,
                },
                {
                    _id: 1,
                    title: 1,
                    slug: 1,
                    description: 1,
                    descriptionImage: 1,
                    createdOn: 1,
                    updatedOn: 1,
                    publishedOn: 1,
                    published: 1,
                    visits: 1,
                }
            )
            .sort({
                publishedOn: showUnpublished ? 0 : -1,
                updatedOn: -1
            })
            .exec();

        return blogPostDocuments.map(mapBlogPostDocumentToDto);
    }

    /**
     * Returns the list of blog posts.
     * @param {String} slug 
     * @param {UserContext} userContext 
     * @returns {Resolver<BlogPostDto>}
     */
    async getBlogPost(slug, userContext) {
        /** @type {BlogPostDocument} */
        const blogPostDocument = await BlogPost
            .findOne(
                {
                    slug: slug
                },
                {
                    _id: 1,
                    title: 1,
                    slug: 1,
                    description: 1,
                    descriptionImage: 1,
                    content: 1,
                    createdOn: 1,
                    updatedOn: 1,
                    publishedOn: 1,
                    published: 1,
                    "attachments.name": 1,
                    "attachments.size": 1,
                    "attachments.contentType": 1,
                    visits: 1,
                }
            )
            .exec();

        if (!blogPostDocument) {
            return null;
        }

        if (!blogPostDocument.published) {
            userContext.verifyAdminAccess();
        }

        return mapBlogPostDocumentToDto(blogPostDocument);
    }

    /**
     * Deletes a blog post by Id.
     * @param {String} blogPostId 
     * @param {UserContext} userContext 
     * @returns {Promise}
     */
    async deleteBlogPost(blogPostId, userContext) {
        userContext.verifyAdminAccess();

        await BlogPost.deleteOne({ _id: blogPostId }).exec();
    }

    /**
     * Updates existing blog post.
     * @param {BlogPostDto} blogPost Updated blog post.
     * @param {UserContext} userContext Updated blog post.
     */
    async updateBlogPost(blogPost, userContext) {
        userContext.verifyAdminAccess();

        /** @type {BlogPostDocument} */
        const existingBlogPost = await BlogPost.findOne({ _id: mongoose.Types.ObjectId(blogPost.id) }).exec();

        if (!existingBlogPost) {
            throw new Error('Not found');
        }

        mapBlogPostDtoToDocument(blogPost, existingBlogPost);

        await existingBlogPost.save();
    }

    /**
     * Create a new blog post.
     * @param {BlogPostDto} blogPost Updated blog post.
     * @param {UserContext} userContext Updated blog post.
     */
     async createBlogPost(blogPost, userContext) {
        userContext.verifyAdminAccess();

        const newBlogPost = new BlogPost();

        mapBlogPostDtoToDocument(blogPost, newBlogPost);

        await newBlogPost.save();
    }

    /**
     * @param {String} blogPostSlug Blog post slug.
     * @param {String} attachmentName Attachment name.
     * @returns {Promise<Attachment>}
     */
    async getAttachment(blogPostSlug, attachmentName) {
        const blogPost = await BlogPost
            .findOne(
                {
                    slug: blogPostSlug,
                },
                {
                    attachments: {
                        $elemMatch: {
                            name: attachmentName,
                        },
                    },
                }
            )
            .exec();

        if (blogPost?.attachments?.length > 0) {
            return blogPost.attachments.find(attachment => attachment.name === attachmentName);
        }

        return null;
    }

    /**
     * Registers a visit for a blog post.
     * @param {String} blogPostSlug Blog post slug.
     * @returns {Promise}
     */
    async registerVisit(blogPostSlug) {
        await BlogPost
            .findOneAndUpdate(
                {
                    slug: blogPostSlug,
                },
                {
                    $inc: {
                        visits: 1,
                    },
                }
            )
            .exec();
    }
}


export {
    BlogManager
};
