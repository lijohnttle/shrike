import { Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';


const SectionHeader = ({ text }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h2" gutterBottom>
                {text}
            </Typography>
        </div>
    );
};


export {
    SectionHeader
};
