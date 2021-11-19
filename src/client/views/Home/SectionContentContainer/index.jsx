import React from 'react';
import { useStyles } from './styles';


const SectionContentContainer = ({ children, className }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${className || ''}`}>
            {children}
        </div>
    );
};


export {
    SectionContentContainer
};
