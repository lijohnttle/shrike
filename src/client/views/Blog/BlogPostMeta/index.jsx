import React from 'react';
import { Button, Typography } from '@mui/material';
import { ReadMore as ReadMoreIcon } from '@mui/icons-material';
import { InternalLink } from '../../../components/InternalLink';
import { Link as RouterLink } from 'react-router-dom';
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

            <Box
                overflow="hidden"
                marginBottom={2}
                sx={{
                    aspectRatio: '4/3',
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
            </Box>
            
            <InternalLink to={getBlogPostUrl(props.blogPost.slug)} withoutUnderline>
                <Typography variant="h3" gutterBottom>
                    {props.blogPost.title.toUpperCase()}
                </Typography>
            </InternalLink>
                        
            <Typography variant="body1" align="justify" paragraph>
                {props.blogPost.description}
            </Typography>

            <Box alignSelf="flex-end">
                <Button
                    component={RouterLink}
                    variant="outlined"
                    color="primary"
                    to={`/blog/${props.blogPost.slug}`}
                    startIcon={<ReadMoreIcon />}>
                    Read More
                </Button>
            </Box>
        </Box>
    );
};


export {
    BlogPostMeta
};
