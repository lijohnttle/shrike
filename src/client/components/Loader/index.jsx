import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export function Loader() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" alignSelf="center">
            <CircularProgress />
        </Box>
    );
};
