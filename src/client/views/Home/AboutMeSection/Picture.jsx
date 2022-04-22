import React from 'react';
import { Box } from '@mui/system';

export const Picture = () => (
    <Box
        flexGrow="1"
        padding={4}
        sx={{
            display: {
                xs: 'none',
                md: 'block',
            },                                
        }}>
        <Box
            width="100%"
            height="100%"
            sx={{
                background: "url('/assets/images/development.png')",
                backgroundSize: 'contain',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }} />
    </Box>
);