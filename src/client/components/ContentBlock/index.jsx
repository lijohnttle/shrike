import React from 'react';
import { Container } from '@mui/material';
import { Box, Breakpoint, SxProps, Theme } from '@mui/system';


/**
 * @param {Object} param0
 * @param {React.ReactNode} param0.children
 * @param {Boolean} param0.compact
 * @param {Breakpoint} param0.maxWidth
 * @param {SxProps<Theme>} param0.sx
 * @returns {React.ReactNode} 
 */
export function ContentBlock({ compact, maxWidth, sx, children }) {
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
