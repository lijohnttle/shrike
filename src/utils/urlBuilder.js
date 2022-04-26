/**
 * Returns a Url to the blog post.
 * @param {String} slug Blog post slug.
 * @returns {String}
 */
 export function getBlogPostUrlPath(slug) {
    return `/blog/${slug}`;
}

/**
 * Returns a Url to the blog post attachment.
 * @param {String} slug Blog post slug.
 * @param {String} attachmentName Attachment name. 
 * @returns {String}
 */
export function getBlogPostAttachmentUrlPath(slug, attachmentName) {
    return `/content/blog/${slug}/attachments/${attachmentName}`;
}

/**
 * Extracts a blog post slug from a Url path.
 * @param {String} urlPath Url path. 
 * @returns {String}
 */
export function extractBlogPostSlugFromUrl(urlPath) {
    const matches = /^\/blog\/(?<slug>[^\s!?\/.*#|]+)/.exec(urlPath);

    return matches?.groups?.slug || '';
}
