import React, { useCallback } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { InternalLink } from '../';
import { useNavigate } from 'react-router';
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
 * @param {BlogPostModel} param0.blogPost Blog post.
 * @param {Boolean} param0.showDescription Displays blog description.
 * @param {Boolean} param0.compact Displays in compact mode.
 * @returns {React.ReactNode}
 */
export function BlogPostPreview({ 
    blogPost,
    showDescription,
    compact,
}) {
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();

    const userSession = getUserSession();

    const handleClick = useCallback(() => navigate(urlUtils.getBlogPostUrlPath(blogPost.slug)));

    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{
                flex: '1',
                background: '#fafafa',
                cursor: 'pointer',
                padding: {
                    xs: 2,
                    sm: compact ? 2 : 4,
                },

                '&:hover': {
                    background: '#efefef',
                },
            }}
            onClick={handleClick}>
            <Typography variant="caption" align="justify" marginBottom={1}>
                {buildSubTitle(blogPost, userSession)}
            </Typography>

            <InternalLink
                to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                sx={{
                    display: 'block',
                    overflow: 'hidden',
                    aspectRatio: '3/2',
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
                    position: 'relative',
                    color: colors.text,
                }}>

                {compact
                    ? (
                        <Tooltip title={blogPost.title}>
                            <Box position="relative">
                                <Typography variant="h5">
                                    &nbsp;
                                </Typography>
                                <Typography
                                    variant="h5"
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    width="100%"
                                    noWrap>
                                    {blogPost.title.toUpperCase()}
                                </Typography>
                            </Box>
                        </Tooltip>
                    )
                    : (
                        <Typography variant="h3" gutterBottom={showDescription}>
                            {blogPost.title.toUpperCase()}
                        </Typography>
                    )}

                {showDescription
                    ? (
                        <Typography variant="body1" textAlign="justify">
                            {blogPost.description}
                        </Typography>
                    )
                    : null}

                <Typography variant="body1" marginTop={1} fontWeight="bold">
                    {blogPost.category || <>&nbsp;</>}
                </Typography>
            </InternalLink>
        </Box>
    );
}
