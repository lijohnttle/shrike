import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: theme.spacing(2),
        paddingLeft: 0,

        '& li': {
            listStylePosition: 'inside'
        }
    }
}));

const AccomplishmentList = ({ accomplishments }) => {
    const classes = useStyles();

    return (
        <ul className={classes.root}>
            {accomplishments.map((t, i) => <li key={i}><Typography component="span">{t}</Typography><br/></li>)}
        </ul>
    );
};

export { AccomplishmentList };