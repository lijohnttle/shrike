import React from 'react';
import { Box } from '@material-ui/core';
import { Fade } from 'react-reveal';

const Sectioncontainer = ({ children }) => {
    return (
        <Box mb={12}>
            <Fade>
                {children}
            </Fade>
        </Box>
    );
};

export { Sectioncontainer };