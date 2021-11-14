import React from 'react';
import { Button, Typography } from '@mui/material';
import { ReadMore as ReadMoreIcon } from '@mui/icons-material';
import { InternalLink } from '../../../components/InternalLink';
import { useStyles } from './styles';
import { BlogPostTile } from '../BlogPostTile';


const BlogPostMeta = ({ post }) => {
    const classes = useStyles();

    return (
        <BlogPostTile>
            <div className={classes.root}>
                <div className={classes.publishedOn}>
                    <Typography variant="caption" align="justify">
                        {post.publishedOn.toLocaleDateString()}
                    </Typography>
                </div>
                
                <InternalLink to={`/blog/${post.slug}`} withoutUnderline>
                    <Typography variant="h3" gutterBottom>
                        {post.title.toUpperCase()}
                    </Typography>
                </InternalLink>
                            
                <Typography variant="body1" align="justify" paragraph>
                    {post.description}
                </Typography>

                <div className={classes.bottomToolBar}>
                    <Button
                        variant="outlined"
                        color="primary"
                        href={`/blog/${post.slug}`}
                        startIcon={<ReadMoreIcon />}>
                        Read More
                    </Button>
                </div>
            </div>
        </BlogPostTile>
    );
};


export {
    BlogPostMeta
};
