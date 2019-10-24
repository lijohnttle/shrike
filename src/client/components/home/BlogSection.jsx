import React from 'react';
import { CircularProgress, Typography, Card, CardHeader, CardContent } from '@material-ui/core';
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
            <Card>
                <CardHeader title="Blog" titleTypographyProps={{ variant: "h1" }} />
                <CardContent>
                    {this.state.isLoading
                        ? <CircularProgress />
                        : this.renderBlogPostPreviews() }
                </CardContent>
            </Card>
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