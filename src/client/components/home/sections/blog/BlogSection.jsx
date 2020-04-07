import React from 'react';
import { CircularProgress, Typography, Box } from '@material-ui/core';
import * as blogService from '../../../../services/blogService';
import { BlogPostPreview } from './BlogPostPreview';

class BlogSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            hasLoadError: false,
            posts: []
        }
    }

    componentDidMount() {
        blogService
            .getPosts()
            .then((posts) => this.setState({
                isLoading: false,
                hasLoadError: false,
                posts: posts,
            }))
            .catch(() => this.setState({ hasLoadError: true }));
    }

    render() {
        return (
            <Box p={6}>
                <Box pb={2}>
                    <Typography variant="h1">
                        Blog
                    </Typography>
                </Box>

                {this.state.isLoading
                    ? <CircularProgress />
                    : this.renderBlogPostPreviews() }
            </Box>
        );
    }

    renderBlogPostPreviews() {
        if (this.state.posts.length === 0) {
            return (
                <Typography variant="body1" gutterBottom={true}>
                    There are no blog posts yet
                </Typography>
            );
        }

        return (
            <div>
                {this.state.posts.map((post) => <BlogPostPreview key={post.id} post={post} />)}
            </div>
        );
    }
}

export { BlogSection };