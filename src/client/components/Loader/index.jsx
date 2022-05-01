import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loader = () => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" alignSelf="center">
        <CircularProgress />
    </Box>
);
