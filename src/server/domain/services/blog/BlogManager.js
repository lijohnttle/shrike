import mongoose from 'mongoose';
import { AttachmentDto, BlogPostDto } from '../../../../contracts';
import { Attachment } from '../../../data/models/Attachment';
import { BlogPost, BlogPostDocument } from '../../../data/models/blog/BlogPost';
import { UserContext } from '../../entities/authentication/UserContext';


/**
 * Updates fields of an existing blog post.
 * @param {BlogPostDto} source 
 * @param {BlogPostDocument} dest 
 */
const mapBlogPostDtoToDocument = (source, dest) => {
    dest.title = source.title;
    dest.description = source.description;
    dest.content = source.content;
    dest.slug = source.slug;
    dest.published = source.published;
    dest.updatedOn = new Date();

    if (dest.published) {
        if (!dest.publishedOn) {
            dest.publishedOn = dest.updatedOn;
        }
    }
    else {
        dest.publishedOn = null;
    }
    
    const existingAttachments = dest.attachments || [];
    const attachmentsInput = source.attachments || [];
    /** @type {Attachment[]} */
    const newAttachments = [];

    if (attachmentsInput.length > 0) {
        // keep attachments that were not removed or reloaded on the client
        const attachmentsToKeep = new Set(attachmentsInput.filter(t => !t.data).map(t => t.name));
        
        for (let attachment of existingAttachments.filter(t => attachmentsToKeep.has(t.name))) {
            newAttachments.push(attachment);
        }

        for (let attachment of attachmentsInput.filter(t => !!t.data)) {
            newAttachments.push({
                name: attachment.name,
                size: attachment.size,
                data: Buffer.from(attachment.data, 'base64'),
                contentType: attachment.contentType,
            });
        }
    }

    dest.attachments = newAttachments;
};

/**
 * Converts data model of a blog post into DTO. 
 * @param {BlogPostDocument} source 
 * @returns {BlogPostDto}
 */
const mapBlogPostDocumentToDto = (source) => {
    return new BlogPostDto({
        id: source._id,
        title: source.title,
        slug: source.slug,
        description: source.description,
        content: source.content,
        createdOn: source.createdOn.toUTCString(),
        updatedOn: source.updatedOn.toUTCString(),
        publishedOn: source.publishedOn ? source.publishedOn.toUTCString() : null,
        published: !!source.published,
        attachments: source.attachments?.map(attachment => new AttachmentDto({
            name: attachment.name,
            contentType: attachment.contentType,
            data: null,
            size: attachment.size,
            url: `/content/blog/${source.slug}/attachments/${attachment.name}`
        })),
    });
};


class BlogManager {
    /**
     * Returns the list of blog posts.
     * @param {Boolean} includeUnpublished
     * @param {UserContext} userContext 
     * @returns {Resolver<BlogPostDto[]>}
     */
    async getBlogPostList(includeUnpublished, userContext) {
        const requireAdminRole = includeUnpublished;

        if (requireAdminRole) {
            userContext.verifyAdminAccess();
        }

        const filter = {};

        if (!includeUnpublished) {
            filter.published = true;
        }

        /** @type {BlogPostDocument[]} */
        const blogPostDocuments = await BlogPost.find(
            filter,
            {
                _id: 1,
                title: 1,
                slug: 1,
                description: 1,
                createdOn: 1,
                updatedOn: 1,
                publishedOn: 1,
                published: 1,
            }
        );

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
        const blogPostDocument = await BlogPost.findOne(
            {
                slug: slug
            },
            {
                _id: 1,
                title: 1,
                slug: 1,
                description: 1,
                content: 1,
                createdOn: 1,
                updatedOn: 1,
                publishedOn: 1,
                published: 1,
                "attachments.name": 1,
                "attachments.size": 1,
                "attachments.contentType": 1,
            }
        );

        if (!blogPostDocument) {
            return null;
        }

        if (!blogPostDocument.published) {
            userContext.verifyAdminAccess();
        }

        console.log(blogPostDocument.attachments);

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

        await BlogPost.deleteOne({ _id: blogPostId });
    }

    /**
     * Updates existing blog post.
     * @param {BlogPostDto} blogPost Updated blog post.
     * @param {UserContext} userContext Updated blog post.
     */
    async updateBlogPost(blogPost, userContext) {
        userContext.verifyAdminAccess();

        /** @type {BlogPostDocument} */
        const existingBlogPost = await BlogPost.findOne({ _id: mongoose.Types.ObjectId(blogPost.id) });

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
     * @param {String} blogPostSlug
     * @param {String} attachmentName
     * @returns {Promise<Attachment>}
     */
    async getAttachment(blogPostSlug, attachmentName) {
        const blogPost = await BlogPost.findOne(
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
        );

        if (blogPost?.attachments?.length > 0) {
            return blogPost.attachments.find(attachment => attachment.name === attachmentName);
        }

        return null;
    }
}


export {
    BlogManager
};
