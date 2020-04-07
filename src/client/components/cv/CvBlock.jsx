import React from 'react';
import { Box, Typography } from '@material-ui/core';

const CvBlock = ({ title, titleBackground, children }) => {
    return (
        <React.Fragment>
            <Box ml={4} mt={6} mb={2} pl={2} pt={1} pb={1} style={{ background: titleBackground }}>
                <Typography variant="h2">
                    {title}
                </Typography>
            </Box>

            <Box ml={6} mr={6}>
                {children}
            </Box>
        </React.Fragment>
    );
};

export { CvBlock };