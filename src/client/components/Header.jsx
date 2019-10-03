import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    }
});

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="relative">
                <Toolbar>
                    <Button color="inherit" href="/">
                        <Typography variant="h6">
                            LIJOHNTTLE
                        </Typography>
                    </Button>

                    <Typography className={classes.title}>

                    </Typography>

                    <Button color="inherit" href="/#books">Books</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export { Header };