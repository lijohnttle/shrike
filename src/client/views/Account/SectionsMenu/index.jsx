import React from 'react';
import { useStyles } from './styles.js';


const SectionsMenu = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ul className={classes.list}>
                {children}
            </ul>
        </div>
    )
};


export {
    SectionsMenu
};
