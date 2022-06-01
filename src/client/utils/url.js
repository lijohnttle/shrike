import { getBlogPostAttachmentUrlPath } from '../../utils/urlBuilder';
import { BlogPostModel } from '../models';


/**
 * @param {String} query 
 * @returns {Object} 
 */
 function parseQueryParams(query) {
    const result = { };

    if (query) {
        const keyValues = query.split('&');

        for (let keyValue of keyValues) {
            const [key, value] = keyValue.split('=').map(t => t.trim());

            result[key] = value;
        }
    }
    
    return result;
}

/**
 * @param {String} url 
 * @param {BlogPostModel} blogPost 
 */
export function parseBlogPostUrl(url, blogPost) {
    let resultUrl = url;
    let queryParams;

    const linkToAttachment = url.indexOf('/') < 0;

    if (linkToAttachment) {
        let urlParts = url.split('?');
        let attachmentName = urlParts[0];

        if (blogPost.attachments) {
            const foundAttachment = blogPost.attachments.find(t => t.name === attachmentName);

            if (foundAttachment) {
                resultUrl = foundAttachment.getUrl();
            }
        }
        else if (blogPost.slug) {
            resultUrl = getBlogPostAttachmentUrlPath(blogPost.slug, src);
        }

        if (urlParts.length > 1) {
            queryParams = parseQueryParams(urlParts[1]);
        }
    }

    return {
        url: resultUrl,
        queryParams: queryParams || { },
    };
}
