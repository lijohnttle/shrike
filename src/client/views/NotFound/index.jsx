import { Typography } from '@mui/material';
import { Box, textAlign } from '@mui/system';
import React from 'react';
import { Article, ContentBlock, Page } from '../../components';


export const NotFound = () => (
    <Page title="Not Found">
        <Article title="Oops!" titleStyles={{ textAlign: 'center' }}>
            <ContentBlock>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h2">
                        404 - PAGE NOT FOUND
                    </Typography>
                </Box>
            </ContentBlock>
        </Article>
    </Page>
);
