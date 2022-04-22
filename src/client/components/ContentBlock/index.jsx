import React from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';


export const ContentBlock = ({ children, compact, sx, maxWidth }) => {
    return (
        <Box
            overflow="hidden"
            sx={[{
                paddingTop: {
                    xs: 2,
                    sm: compact ? 2 : 8,
                },
                paddingBottom: {
                    xs: 2,
                    sm: compact ? 2 : 4,
                },
            }, sx]}>
            <Container maxWidth={maxWidth || 'lg'}>
                {children}
            </Container>
        </Box>
    )
};
