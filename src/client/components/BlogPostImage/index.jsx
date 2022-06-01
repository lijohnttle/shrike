import React from 'react';
import { Box, Typography } from '@mui/material';
import { BlogPostModel } from '../../models'
import { parseBlogPostUrl } from '../../utils/url';


/**
 * @param {Object} query 
 * @returns {Object} 
 */
function getImageStyles(queryParams) {
    const result = { };

    for (let key of Object.keys(queryParams)) {
        const value = queryParams[key];

        if (key === 'size') {
            if (value === 'small') {
                result.maxHeight = 'calc(0.66*100vh)';
            }
            else if (value === 'fit') {
                result.maxHeight = 'calc(100vh)';
            }
        }
        else if (key === align) {
            if (value === 'center') {
                result.alignSelf = 'center';
            }
        }
    }

    return result;
}

/**
 * @param {*} param0 
 * @param {String} param0.src
 * @param {String} param0.alt
 * @param {BlogPostModel} param0.blogPost
 * @returns 
 */
export function BlogPostImage({ src, alt, blogPost }) {
    const parsedUrl = parseBlogPostUrl(src, blogPost);
    const styles = getImageStyles(parsedUrl.queryParams);

    return (
        <Box display="flex" flexDirection="column" alignItems="center" marginBottom={3}>
            <img src={parsedUrl.url} alt={alt} style={{ maxWidth: '100%', ...styles }} />

            {alt
                ? (
                    <Typography fontWeight="bold" marginTop={1} sx={{ fontSize: '0.8em' }}>
                        Picture - {alt}
                    </Typography>
                ) : null}
            
        </Box>
    );
}
