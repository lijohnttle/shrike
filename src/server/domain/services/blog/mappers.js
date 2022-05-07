import { AttachmentDto, BlogPostDto } from '../../../../contracts';
import { getBlogPostAttachmentUrlPath } from '../../../../utils/urlBuilder';
import { BlogPostDocument } from '../../../data/models/blog/BlogPost';

/**
 * Updates fields of an existing blog post.
 * @param {BlogPostDto} source 
 * @param {BlogPostDocument} dest 
 */
export function mapBlogPostDtoToDocument(source, dest) {
    dest.title = source.title;
    dest.description = source.description;
    dest.descriptionImage = source.descriptionImage;
    dest.content = source.content;
    dest.slug = source.slug;
    dest.published = source.published;
    dest.updatedOn = new Date();
    dest.category = source.category;

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
export function mapBlogPostDocumentToDto(source) {
    return new BlogPostDto({
        id: source._id,
        title: source.title,
        slug: source.slug,
        description: source.description,
        descriptionImage: source.descriptionImage,
        content: source.content,
        createdOn: source.createdOn.toUTCString(),
        updatedOn: source.updatedOn.toUTCString(),
        publishedOn: source.publishedOn ? source.publishedOn.toUTCString() : null,
        published: !!source.published,
        attachments: source.attachments?.map(attachment => new AttachmentDto({
            name: attachment.name,
            contentType: attachment.contentType,
            data: attachment.data,
            size: attachment.size,
            url: getBlogPostAttachmentUrlPath(source.slug, attachment.name),
        })),
        visits: source.visits,
        category: source.category,
    });
};