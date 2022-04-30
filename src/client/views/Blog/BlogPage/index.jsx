import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ContentBlock } from '../../../components/ContentBlock';
import { Article } from '../../../components/Article';
import { Page } from '../../../components/Page';
import { BlogPostMeta } from '../BlogPostMeta';
import { BlogToolBar } from '../BlogToolBar';
import { useIsCancelled, useUserSession } from '../../../hooks';
import { fetchBlogPostList } from '../../../services/blogService';
import { BlogPostModel } from '../../../models';
import { Box } from '@mui/system';
import { pagesDescriptors } from '../../../../static';


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
    const isCancelled = useIsCancelled();
    /** @type {[BlogPostModel, Function]} */
    const [blogPosts, setBlogPosts] = useState([]);
    const [showUnpublished, setShowUnpublished] = useState(false);
    const [getUserSession] = useUserSession();

    useEffect(() => {
        refreshPosts();
    }, [showUnpublished]);

    const refreshPosts = async () => {
        const session = getUserSession();

        await fetchBlogPostList({ userToken: session?.token, unpublished: showUnpublished })
            .then(data => {
                if (!isCancelled.current) {
                    setBlogPosts(data);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <Page title="Blog">
            <Article pageDescriptor={pagesDescriptors.BLOG}>
                <BlogToolBar showUnpublished={showUnpublished} onShowUnpublishedChange={setShowUnpublished} />

                {blogPosts.length > 0
                    ? (
                        <ContentBlock compact>
                            <Box
                                display="flex"
                                flexDireaction="row"
                                flexWrap="wrap"
                                sx={{
                                    '& > div:nth-of-type(odd)': {
                                        paddingRight: {
                                            xs: 0,
                                            sm: 2
                                        },
                                    },
                                    '& > div:nth-of-type(even)': {
                                        paddingLeft: {
                                            xs: 0,
                                            sm: 2
                                        },
                                    },
                                }}>
                                {blogPosts.map((post) => (
                                    <Box
                                        key={post.slug}
                                        sx={{
                                            paddingBottom: 2,
                                            width: {
                                                xs: '100%',
                                                sm: '50%',
                                            },
                                        }}>
                                        <BlogPostMeta blogPost={post} />
                                    </Box>
                                ))}
                            </Box>
                        </ContentBlock>
                    )
                    : renderBlogPostsPlaceholder()}
            </Article>
        </Page>
    )
};


export {
    BlogPage
};
