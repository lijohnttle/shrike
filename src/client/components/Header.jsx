import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <Button color="inherit" href="/">
                        <Typography variant="h6" className={classes.title}>
                            LIJOHNTTLE
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export { Header };