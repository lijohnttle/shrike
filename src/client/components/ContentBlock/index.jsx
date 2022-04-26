import React from 'react';
import { Container } from '@mui/material';
import { Box, Breakpoint, SxProps, Theme } from '@mui/system';


/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Boolean} props.compact
 * @param {Breakpoint} props.maxWidth
 * @param {SxProps<Theme>} props.styles
 * @returns {React.ReactNode} 
 */
export const ContentBlock = (props) => {
    return (
        <Box
            overflow="hidden"
            sx={[{
                paddingTop: {
                    xs: 2,
                    sm: props.compact ? 2 : 8,
                },
                paddingBottom: {
                    xs: 2,
                    sm: props.compact ? 2 : 4,
                },
            }, props.styles]}>
            <Container maxWidth={props.maxWidth || 'lg'}>
                {props.children}
            </Container>
        </Box>
    )
};
