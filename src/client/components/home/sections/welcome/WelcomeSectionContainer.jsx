import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        boxShadow: theme.shadows[3]
    }
}));

const WelcomeSectionContainer = ({ children }) => {
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => setWindowHeight(window.innerHeight), []);
    
    const classes = useStyles();

    return (
        <Box className={classes.root} minHeight={`${windowHeight}px`}>
            {children}
        </Box>
    );
}

export default WelcomeSectionContainer;