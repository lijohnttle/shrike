import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline-block',
        background: '#2c77ff',
        color: 'white',
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
        borderRadius: theme.spacing(0.5),
        cursor: 'default'
    }
}));

const Label = ({ title }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <span className={classes.root}>{title}</span>
            &nbsp;
        </React.Fragment>
    );
};

export { Label };