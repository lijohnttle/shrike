import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: '1',
    },
    header: {
        background: 'white',
    },
    childrenContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        paddingBottom: theme.spacing(16),
    },
    title: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
    },
    hollow: {
        background: '#f7f7f7',
    },
}));

const Article = ({ title, updatedOn, hollow, children }) => {
    const classes = useStyles();

    let updateOnElement = null;

    if (updatedOn) {
        updateOnElement = (
            <Typography variant="caption" align="center" color="textSecondary" gutterBottom paragraph>
                (Updated on <b>{updatedOn}</b>)
            </Typography>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Container maxWidth="lg">
                    <div className={classes.title}>
                        <Typography variant="h1" align="center">
                            {title}
                        </Typography>

                        {updateOnElement}
                    </div>
                </Container>
            </div>

            <div className={`${classes.childrenContainer} ${hollow ? classes.hollow : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Article;