import React from 'react';
import { Typography } from '@material-ui/core';

const Education = ({ data }) => {
    return (
        <div>
            <Typography variant="h3">
                {data.title}
            </Typography>
            <Typography>
                {data.description}
            </Typography>
            <Typography variant="caption">
                {data.date}, {data.location}
            </Typography>
        </div>
    );
};

export { Education };