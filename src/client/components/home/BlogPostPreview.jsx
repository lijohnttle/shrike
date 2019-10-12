import React from 'react';
import { Card, CardHeader, CardContent, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.background.light
    }
}));

const BlogPostPreview = ({ post }) => {
    const classes = useStyles();
    const publishedOn = post.publishedOn ? new Date(Date.parse(post.publishedOn)).toLocaleString() : '';

    return (
        <Card className={classes.root}>
            <CardHeader
                title={post.title}
                subheader={publishedOn} />
            <CardContent>
                <Typography variant="body2" paragraph>
                    {post.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export { BlogPostPreview };