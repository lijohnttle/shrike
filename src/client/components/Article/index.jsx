import React from 'react';
import { Container, Typography } from '@mui/material';
import { useStyles } from './styles';


const Article = ({ title, updatedOn, topGutter, children }) => {
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
                    <div>
                        <Typography variant="h1" align="center">
                            {title}
                        </Typography>

                        {updateOnElement}
                    </div>
                </Container>
            </div>

            <div className={`${classes.childrenContainer} ${topGutter ? classes.topGutter : ''}`}>
                {children}
            </div>
        </div>
    );
};


export {
    Article
};
