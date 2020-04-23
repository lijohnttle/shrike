import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2)
    }
}));

const Header = ({ position, employer, date, location }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>
                <Typography variant="h3" component="span">
                    {position}&nbsp;
                </Typography>
                <Typography component="span">
                    at {employer}
                </Typography>
            </Typography>
            <Typography variant="caption">
                {date}, {location}
            </Typography>
        </div>
    );
};

export { Header };