import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        }
    }
}));

export default ({ children, rootClassName }) => {
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