import React from 'react';
import { Container, Typography } from '@mui/material';

export const ArticleHeader = ({ title, subTitle, titleStyles, maxWidth }) => (
    <Container maxWidth={maxWidth || 'lg'}>
        <Typography variant="h1" fontWeight="bold" sx={titleStyles}>
            {title}
        </Typography>

        {subTitle ? (
            <Typography variant="caption" color="textSecondary" fontSize="1.2rem">
                {subTitle}
            </Typography>
        ) : null}
    </Container>
);