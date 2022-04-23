import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { ContentBlock } from '../../../components/ContentBlock';
import { Article } from '../../../components/Article';
import { Page } from '../../../components/Page';
import { BlogPostMeta } from '../BlogPostMeta';
import { BlogToolBar } from '../BlogToolBar';
import { useUserSession } from '../../../hooks';
import { fetchBlogPostList } from '../../../services/blogService';


const renderBlogPostsPlaceholder = () => {
    return (
        <ContentBlock compact>
            <Typography variant="h3" align="center">
                There are no posts yet
            </Typography>
        </ContentBlock>
    );
};

const BlogPage = () => {
    const isCancelled = useRef(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [showUnpublished, setShowUnpublished] = useState(false);
    const [getUserSession] = useUserSession();

    useEffect(() => {
        return () => {
            isCancelled.current = true;
        };
    }, []);

    useEffect(() => {
        refreshPosts();
    }, [showUnpublished]);

    const refreshPosts = async () => {
        const session = getUserSession();

        await fetchBlogPostList({ userSession: session, unpublished: showUnpublished })
            .then(data => {
                if (!isCancelled.current) {
                    setBlogPosts(data);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <Page title="Blog">
            <Article title="BLOG">
                <BlogToolBar showUnpublished={showUnpublished} setShowUnpublished={setShowUnpublished} />

                {blogPosts.length > 0
                    ? blogPosts.map((post) => (
                        <ContentBlock key={post.slug} compact>
                            <BlogPostMeta post={post} />
                        </ContentBlock>
                    ))
                    : renderBlogPostsPlaceholder()}
            </Article>
        </Page>
    )
};


export {
    BlogPage
};
