import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useStyles } from './styles';


const renderTitle = (title, fontFamily, classes) => {
    return (
        <div className={classes.title}>
            <Typography variant="h1" fontFamily={fontFamily} fontWeight="bold" align="center">
                {title?.toUpperCase()}
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

const SectionContentContainer = ({
    children,
    contentRootClassName,
    title,
    titleFontFamily,
    isLoading,
    maxWidth }) => {

    const classes = useStyles();

    return (
        <Container maxWidth={maxWidth || 'lg'} style={{ display: 'flex', flex: '1' }}>
            <div className={`${classes.contentRoot} ${contentRootClassName || ''}`}>
                <div className={classes.space}></div>

                {title ? renderTitle(title, titleFontFamily, classes) : null}

                {isLoading ? renderLoader(classes) : children}

                <div className={classes.space}></div>
            </div>
        </Container>
    );
};


export {
    SectionContentContainer
};
