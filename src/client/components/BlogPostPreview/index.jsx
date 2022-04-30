import React from 'react';
import { Box, Typography } from '@mui/material';
import { InternalLink } from '../';
import { useUserSession } from '../../hooks';
import { BlogPostModel, UserSessionModel } from '../../models';
import * as urlUtils from '../../../utils/urlBuilder';
import { colors } from '../../themes';


/**
 * @param {BlogPostModel} blogPost 
 * @param {UserSessionModel} session 
 * @return {String}
 */
 function buildSubTitle(blogPost, session) {
    const subTitle = [];

    if (blogPost.publishedOn) {
        subTitle.push(blogPost.publishedOn.toLocaleDateString());
    }

    if (!blogPost.published) {
        subTitle.push('Not published');
    }

    if (session) {
        subTitle.push(`Visits: ${blogPost.visits ?? 0}`);
    }

    return subTitle.join(' | ');
}

/**
 * Represents a blog post preview.
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 * @returns {React.ReactNode}
 */
export function BlogPostPreview({ 
    blogPost
}) {
    const [getUserSession] = useUserSession();

    const userSession = getUserSession();

    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="justify" marginBottom={1}>
                {buildSubTitle(blogPost, userSession)}
            </Typography>

            <InternalLink
                to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                sx={{
                    display: 'block',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    marginBottom: 2,
                    backgroundColor: colors.selectionBackground,
                }}>
                {blogPost.descriptionImage
                    ? (
                        <img
                            src={urlUtils.getBlogPostAttachmentUrlPath(blogPost.slug, blogPost.descriptionImage)}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }} />
                    ) : null}
            </InternalLink>

            <InternalLink
                to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                withoutUnderline
                sx={{
                    color: colors.text,
                }}>
                <Typography variant="h3" gutterBottom>
                    {blogPost.title.toUpperCase()}
                </Typography>
            </InternalLink>
        </Box>
    );
}
