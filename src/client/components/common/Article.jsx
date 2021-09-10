import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: theme.spacing(16),
    },
    title: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
}));

const Article = ({ title, updatedOn, children }) => {
    const classes = useStyles();

    const updateOnElement = null;

    if (updatedOn) {
        updateOnElement = (
            <Typography variant="caption" align="center" color="textSecondary" gutterBottom paragraph>
                (Updated on <b>{updatedOn}</b>)
            </Typography>
        );
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <div className={classes.title}>
                    <Typography variant="h1" align="center">
                        {title}
                    </Typography>

                    {updateOnElement}
                </div>
            </Container>

            {children}
        </div>
    );
};

export default Article;