import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useStyles } from './styles';


const renderTitle = (title, classes) => {
    return (
        <div className={classes.title}>
            <Typography variant="h1" align="center">
                {title}
            </Typography>
        </div>
    );
};

const renderLoader = (classes) => {
    return (
        <div className={classes.loader}>
            <CircularProgress />
        </div>
    );
};

const SectionContentContainer = ({ children, className, title, isLoading }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${className || ''}`}>
            {title ? renderTitle(title, classes) : null}

            {isLoading ? renderLoader(classes) : children}
        </div>
    );
};


export {
    SectionContentContainer
};
