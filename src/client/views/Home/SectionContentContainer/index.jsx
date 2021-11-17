import React from 'react';
import { useStyles } from './styles';


const SectionContentContainer = ({ children, rootClassName }) => {
    const classes = useStyles();

    let rootClasses = classes.root;

    if (rootClassName) {
        rootClasses = `${rootClasses} ${rootClassName}`;
    }

    return (
        <div className={rootClasses}>
            {children}
        </div>
    );
};


export {
    SectionContentContainer
};
