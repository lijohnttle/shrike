import React from 'react';
import { Typography } from '@material-ui/core';

const CvBlockParagraph = ({ children }) => {
    return (
        <Typography variant="body1" paragraph>
            {children}
        </Typography>
    );
};

export { CvBlockParagraph };