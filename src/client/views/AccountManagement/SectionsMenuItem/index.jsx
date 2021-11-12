import React, { useEffect } from 'react';
import { useStyles } from './styles.js';


const SectionsMenuItem = ({ id, header, selection, selectionChanged, isDefault }) => {
    const isSelected = (!selection && isDefault) || id === selection;
    const classes = useStyles({ isSelected });

    useEffect(() => {
        if (!selection && isDefault) {
            selectionChanged(id);
        }
    }, []);

    const handleClick = () => {
        selectionChanged(id);
    };

    return <li key={id} className={classes.listItem} onClick={handleClick}>{header}</li>;
};


export {
    SectionsMenuItem
};
