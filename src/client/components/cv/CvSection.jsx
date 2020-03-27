import React from 'react';
import { Box, Typography } from '@material-ui/core';

const CvSection = ({ title, titleBackground, children }) => {
    return (
        <React.Fragment>
            <Box ml="2rem" mt="3rem" mb="1rem" pl="1rem" pt="0.5rem" pb="0.5rem" style={{ background: titleBackground }}>
                <Typography variant="h2">
                    {title}
                </Typography>
            </Box>

            <Box ml="3rem">
                {children}
            </Box>
        </React.Fragment>
    );
};

export { CvSection };