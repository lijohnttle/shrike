import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    appBarTransparent: {
        background: 'transparent',
        boxShadow: 'none'
    }
});

const HeaderBar = ({ hasBackground, hasFixedPosition }) => {
    const classes = useStyles();
    const appBarClassName = hasBackground ? '' : classes.appBarTransparent;
    const position = hasFixedPosition ? 'fixed' : 'relative';

    return (
        <AppBar className={appBarClassName} position={position}>
            <Toolbar variant="dense">
                <Button color="inherit" href="/">
                    <Typography variant="h6">
                        LIJOHNTTLE
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export { HeaderBar };