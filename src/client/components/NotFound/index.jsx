import { Typography } from '@mui/material';
import React from 'react';
import { Article } from '../Article';
import { ContentBlock } from '../ContentBlock';
import { Page } from '../Page';
import { useStyles } from './styles';


const NotFound = () => {
    const classes = useStyles();

    return (
        <Page title="Not Found">
            <Article title="Oops!">
                <ContentBlock>
                    <div className={classes.contentRoot}>
                        <Typography variant="h2">
                            404 - PAGE NOT FOUND
                        </Typography>
                    </div>
                </ContentBlock>
            </Article>
        </Page>
    );
};


export {
    NotFound
};
