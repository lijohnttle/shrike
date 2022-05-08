import React from 'react';
import { Container, Typography } from '@mui/material';
import { SxProps, Breakpoint } from '@mui/system';


/**
 * Represents article header.
 * @param {Object} param0 
 * @param {any} param0.title Article title. 
 * @param {any} param0.subTitle Article sub-title. 
 * @param {SxProps} param0.titleStyles Article title styles. 
 * @param {Breakpoint} param0.maxWidth The maximum width of the article header. 
 */
export function ArticleHeader({ title, subTitle, titleStyles, maxWidth }) {
    return (
        <Container maxWidth={maxWidth || 'lg'}>
            <Typography variant="h1" fontWeight="bold" sx={titleStyles}>
                {title}
            </Typography>
    
            {subTitle
                ? (
                    <Typography variant="caption" color="textSecondary" fontSize="1.1rem">
                        {subTitle}
                    </Typography>
                )
                : null}
        </Container>
    );
}
