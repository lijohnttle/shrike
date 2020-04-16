import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),

        marginLeft: theme.spacing(-3),
        marginRight: theme.spacing(-6),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(-2),
            marginRight: theme.spacing(-4),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },

        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(-1),
            marginRight: theme.spacing(-2),
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        }
    }
}));

const CvBlock = ({ title, titleBackground, children }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.title} style={{ background: titleBackground }}>
                <Typography variant="h2">
                    {title}
                </Typography>
            </div>

            {children}
        </React.Fragment>
    );
};

export { CvBlock };