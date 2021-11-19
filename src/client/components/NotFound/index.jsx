import { Typography } from '@mui/material';
import React from 'react';
import { Article } from '../Article';
import { ArticleContentBlock } from '../ArticleContentBlock';
import { Page } from '../Page';
import { useStyles } from './styles';


const NotFound = () => {
    const classes = useStyles();

    return (
        <Page title="Not Found">
            <Article title="Oops!">
                <ArticleContentBlock>
                    <div className={classes.contentRoot}>
                        <Typography variant="h2">
                            404 - PAGE NOT FOUND
                        </Typography>
                    </div>
                </ArticleContentBlock>
            </Article>
        </Page>
    );
};


export {
    NotFound
};
