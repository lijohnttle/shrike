/**
 * Returns a Url to the blog post attachment.
 * @param {String} slug Blog post slug.
 * @param {String} attachmentName Attachment name. 
 * @returns 
 */
export function getBlogPostAttachmentUrl(slug, attachmentName) {
    return `/content/blog/${slug}/attachments/${attachmentName}`;
}