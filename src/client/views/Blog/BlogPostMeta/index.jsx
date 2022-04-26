import React from 'react';
import { Typography } from '@mui/material';
import { InternalLink } from '../../../components/InternalLink';
import { Box } from '@mui/system';
import { BlogPostModel } from '../../../models';
import { getBlogPostUrl, getBlogPostAttachmentUrl } from '../../../../utils/urlBuilder';
import colors from '../../../themes/colors';


/**
 * Component to render a blog post details.
 * @param {Object} props 
 * @param {BlogPostModel} props.blogPost 
 * @returns 
 */
const BlogPostMeta = (props) => {
    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="justify" marginBottom={1}>
                {props.blogPost.publishedOn?.toLocaleDateString() ?? ''}

                {!props.blogPost.published ? ' (Not published)' : ''}
            </Typography>

            <InternalLink
                to={getBlogPostUrl(props.blogPost.slug)}
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
                            src={getBlogPostAttachmentUrl(props.blogPost.slug, props.blogPost.descriptionImage)}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }} />
                    ) : null}
            </InternalLink>

            <InternalLink
                to={getBlogPostUrl(props.blogPost.slug)}
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
