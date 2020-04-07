import React from 'react';
import { Box, Typography } from '@material-ui/core';

const CvExperienceDataPresenter = ({ data }) => {
    return (
        <Box>
            <Typography>
                <Typography variant="h3" component="span">
                    {data.position}&nbsp;
                </Typography>
                <Typography component="span">
                    at {data.employer}
                </Typography>
            </Typography>
            <Typography style={{ opacity: 0.66, paddingBottom: "1rem" }}>
                {data.date}, {data.location}
            </Typography>
            <Typography style={{ paddingBottom: "1rem" }}>
                {data.accomplishments.map((t, i) => (
                    <span key={i}>• {t}<br/></span>
                ))}
            </Typography>
            <Typography style={{ paddingBottom: "1rem" }}>
                Tools:&nbsp;
                {data.tools.map((t, i) => (
                    <span key={i}>{i == 0 ? '' : ', '}{t}</span>
                ))}
            </Typography>
            <Typography>
                Technologies:&nbsp;
                {data.technologies.map((t, i) => (
                    <span key={i}>{i == 0 ? '' : ', '}{t}</span>
                ))}
            </Typography>
        </Box>
    );
};

export { CvExperienceDataPresenter };