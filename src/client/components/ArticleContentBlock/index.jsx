import React from 'react';
import { Container } from '@mui/material';
import { useStyles } from './styles';


const ArticleContentBlock = ({ children, className }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${className}`}>
            <Container maxWidth="lg">{children}</Container>
        </div>
    )
};

export {
    ArticleContentBlock
};