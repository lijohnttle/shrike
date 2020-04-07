import React from 'react';
import { Box, Typography } from '@material-ui/core';

const CvEducationDataPresenter = ({ data }) => {
    return (
        <Box>
            <Typography variant="h3">
                {data.title}
            </Typography>
            <Typography>
                {data.description}
            </Typography>
            <Typography style={{ opacity: 0.66 }}>
                {data.date}, {data.location}
            </Typography>
        </Box>
    );
};

export { CvEducationDataPresenter };