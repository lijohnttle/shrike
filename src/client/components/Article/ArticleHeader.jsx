import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { SxProps, Breakpoint } from '@mui/system';
import { colors } from '../../themes';


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
                    <Box sx={{ fontSize: '1.1rem', marginTop: 1 }}>
                        {subTitle}
                    </Box>
                )
                : null}
        </Container>
    );
}
