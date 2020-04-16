import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    titleBar: {
        background: '#5b5c5c',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(3)
    },
    projectList: {
        display: 'flex',
        flexFlow: 'column nowrap',

        [theme.breakpoints.up('lg')]: {
            flexFlow: 'row wrap'
        }
    }
}));

const Category = ({ category, children }) => {
    const classes = useStyles();
    
    return (
        <Box pt={6}>
            <Box className={classes.titleBar}>
                <Typography variant="h3">
                    {category}
                </Typography>
            </Box>

            <div className={classes.projectList}>
                {children}
            </div>
        </Box>
    );
};

export { Category };