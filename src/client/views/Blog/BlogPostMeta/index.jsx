import React from 'react';
import { Typography } from '@mui/material';
import { InternalLink } from '../../../components';
import { Box } from '@mui/system';
import { BlogPostModel, UserSessionModel } from '../../../models';
import { getBlogPostUrlPath, getBlogPostAttachmentUrlPath } from '../../../../utils/urlBuilder';
import colors from '../../../themes/colors';
import { useUserSession } from '../../../hooks';


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
 * Component to render a blog post details.
 * @param {Object} props 
 * @param {BlogPostModel} props.blogPost 
 * @returns 
 */
const BlogPostMeta = (props) => {
    const [getUserSession] = useUserSession();

    const userSession = getUserSession();

    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="justify" marginBottom={1}>
                {buildSubTitle(props.blogPost, userSession)}
            </Typography>

            <InternalLink
                to={getBlogPostUrlPath(props.blogPost.slug)}
                sx={{
                    display: 'block',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    marginBottom: 2,
                    backgroundColor: colors.selectionBackground,
                }}>
                {props.blogPost.descriptionImage
                    ? (
                        <img
                            src={getBlogPostAttachmentUrlPath(props.blogPost.slug, props.blogPost.descriptionImage)}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }} />
                    ) : null}
            </InternalLink>

            <InternalLink
                to={getBlogPostUrlPath(props.blogPost.slug)}
                withoutUnderline
                sx={{
                    color: colors.text,
                }}>
                <Typography variant="h3" gutterBottom>
                    {props.blogPost.title.toUpperCase()}
                </Typography>
            </InternalLink>
        </Box>
    );
};


export {
    BlogPostMeta
};
