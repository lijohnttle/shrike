import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import * as blogService from '../../services/blogService';
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
            <div>
                <Typography variant="h1" gutterBottom={true}>
                    Blog
                </Typography>

                {this.state.isLoading
                    ? <CircularProgress />
                    : this.state.posts.map((post) => <BlogPostPreview key={post.id} post={post} />) }
            </div>
        );
    }
}

export { BlogSection };