import React from 'react';
import { Box } from '@mui/system';

export const LeftContent = ({ children }) => (
    <Box
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        maxWidth="400px"
        fontSize="1.2rem">

        {children}
    </Box>
);