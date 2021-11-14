import React from 'react';
import { Container } from '@mui/material';
import { useStyles } from './styles';


const ArticleContentBlock = ({ children, compact, className }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${compact ? classes.compact : ''} ${className}`}>
            <Container maxWidth="lg">{children}</Container>
        </div>
    )
};

export {
    ArticleContentBlock
};