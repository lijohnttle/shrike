import React from 'react';
import { Container } from '@mui/material';
import { useStyles } from './styles';


const ArticleContentBlock = ({ children, compact, className, maxWidth }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${compact ? classes.compact : ''} ${className}`}>
            <Container maxWidth={maxWidth || 'lg'}>{children}</Container>
        </div>
    )
};

export {
    ArticleContentBlock
};