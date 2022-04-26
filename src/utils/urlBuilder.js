/**
 * Returns a Url to the blog post.
 * @param {String} slug Blog post slug.
 * @returns 
 */
 export function getBlogPostUrl(slug) {
    return `/content/blog/${slug}`;
}

/**
 * Returns a Url to the blog post attachment.
 * @param {String} slug Blog post slug.
 * @param {String} attachmentName Attachment name. 
 * @returns 
 */
export function getBlogPostAttachmentUrl(slug, attachmentName) {
    return `/content/blog/${slug}/attachments/${attachmentName}`;
}