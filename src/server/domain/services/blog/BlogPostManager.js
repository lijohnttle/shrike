import mongoose from 'mongoose';
import { BlogPostDto } from '../../../../contracts';
import { Attachment } from '../../../data/models/Attachment';
import { BlogPost, BlogPostDocument } from '../../../data/models/blog/BlogPost';
import { UserContext } from '../../entities/authentication/UserContext';


/**
 * Updates fields of an existing blog post.
 * @param {BlogPostDto} source 
 * @param {BlogPostDocument} dest 
 */
const mapBlogPostFields = (source, dest) => {
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
        const attachmentsToKeep = new Set(attachmentsInput.filter(t => !t.data).map(t => encodeURI(t.path)));
        
        for (let attachment of existingAttachments.filter(t => attachmentsToKeep.has(t.name))) {
            newAttachments.push(attachment);
        }

        for (let attachment of attachmentsInput.filter(t => !!t.data)) {
            newAttachments.push({
                name: encodeURI(attachment.path),
                size: attachment.size,
                data: Buffer.from(attachment.data, 'base64'),
                contentType: attachment.contentType,
            });
        }
    }

    dest.attachments = newAttachments;
};

class BlogPostManager {
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

        mapBlogPostFields(blogPost, existingBlogPost);

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

        mapBlogPostFields(blogPost, newBlogPost);

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
                "attachments.name": attachmentName,
            },
            {
                attachments: 1
            }
        );

        if (blogPost?.attachments?.length > 0) {
            return blogPost.attachments[0];
        }

        return null;
    }
}


export {
    BlogPostManager
};
