import React from 'react';
import { useStyles } from './styles';


const BlogPostTile = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};

export {
    BlogPostTile
};
