import React from 'react';
import { Button, Typography } from '@mui/material';
import { ReadMore as ReadMoreIcon } from '@mui/icons-material';
import { InternalLink } from '../../../components/InternalLink';
import { useStyles } from './styles';
import { Link as RouterLink } from 'react-router-dom';


const BlogPostMeta = ({ post }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.publishedOn}>
                <Typography variant="caption" align="justify">
                    {post.publishedOn?.toLocaleDateString() ?? ''}

                    {!post.published ? ' (Not published)' : ''}
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
                    component={RouterLink}
                    variant="outlined"
                    color="primary"
                    to={`/blog/${post.slug}`}
                    startIcon={<ReadMoreIcon />}>
                    Read More
                </Button>
            </div>
        </div>
    );
};


export {
    BlogPostMeta
};