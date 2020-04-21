import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(6),
        paddingTop: theme.spacing(12),
        paddingRight: theme.spacing(6),
        paddingBottom: theme.spacing(18),

        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        },

        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    bottomSeparator: {
        borderBottomStyle: 'solid',
        borderBottomWidth: '4px',
        borderBottomColor: 'white',
    }
}));

const Article = ({ background, color, bottomSeparator, children }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${bottomSeparator ? classes.bottomSeparator : ''}`} style={{ background, color }}>
            {children}
        </div>
    );
};

export { Article }; 