import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
        overflow: 'hidden',
    },
}));

const ArticleContentBlock = ({ children, className }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${className}`}>
            <Container maxWidth="lg">{children}</Container>
        </div>
    )
};

export default ArticleContentBlock;