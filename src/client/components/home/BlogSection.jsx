import React from 'react';
import * as blogService from '../../services/blogService';
import { CircularProgress, Typography, Card, CardHeader, CardContent, makeStyles } from '@material-ui/core';

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

                {this.state.isLoading ? <CircularProgress /> : this.renderPosts() }
            </div>
        );
    }

    renderPosts() {
        return this.state.posts.map((post) => {
            return (
                <Card>
                    <CardHeader
                        title={post.title} />
                    <CardContent>
                        <Typography variant="body2" paragraph>
                            {post.description}
                        </Typography>
                    </CardContent>
                </Card>
            );
        });
    }
}

export { BlogSection };