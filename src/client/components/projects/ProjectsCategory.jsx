import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    titleBar: {
        background: '#5b5c5c',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3)
    }
}));

const ProjectsCategory = ({ category, children }) => {
    const classes = useStyles();
    
    return (
        <Box pl={6} pt={6} pr={6}>
            <Box className={classes.titleBar}>
                <Typography variant="h3">
                    {category}
                </Typography>
            </Box>

            {children}
        </Box>
    );
};

export { ProjectsCategory };