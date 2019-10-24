import React from 'react';
import { Card, CardHeader, CardContent, Typography, makeStyles } from '@material-ui/core';

const BlogPostPreview = ({ post }) => {
    const publishedOn = post.publishedOn ? new Date(Date.parse(post.publishedOn)).toLocaleString() : '';

    return (
        <Card>
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