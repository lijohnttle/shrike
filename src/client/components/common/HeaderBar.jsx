import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    appBar: {
        background: 'CornflowerBlue',
    }
}));

const HeaderBar = ({ hasFixedPosition }) => {
    const position = hasFixedPosition ? 'fixed' : 'relative';

    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position={position}>
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

export default HeaderBar;