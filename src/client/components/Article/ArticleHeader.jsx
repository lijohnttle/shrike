import React from 'react';
import { Container, Typography } from '@mui/material';

export const ArticleHeader = ({ title, subTitle, maxWidth }) => (
    <Container maxWidth={maxWidth}>
        <Typography variant="h1" fontWeight="bold">
            {title}
        </Typography>

        {subTitle ? (
            <Typography variant="caption" color="textSecondary" gutterBottom paragraph>
                {subTitle}
            </Typography>
        ) : null}
    </Container>
);