import React from 'react';
import { Typography } from '@material-ui/core';

const CvSectionParagraph = ({ children }) => {
    return (
        <Typography variant="body1" paragraph>
            {children}
        </Typography>
    );
};

export { CvSectionParagraph };