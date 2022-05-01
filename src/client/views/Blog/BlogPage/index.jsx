import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Article, BlogPostPreview, ContentBlock, Loader, Page } from '../../../components';
import { BlogToolBar } from '../BlogToolBar';
import { useDataLoader, useUserSession } from '../../../hooks';
import { fetchBlogPostList } from '../../../services/blogService';
import { BlogPostListModel } from '../../../models';
import { Box } from '@mui/system';
import { pagesDescriptors } from '../../../../static';


const BlogPostsPlaceholder = () => {
    return (
        <ContentBlock compact>
            <Typography variant="h3" align="center">
                There are no posts yet
            </Typography>
        </ContentBlock>
    );
};

const BlogPage = () => {
    /** @type {[BlogPostListModel, Function]} */
    const [blogPostList, setBlogPostList] = useState();
    const [showUnpublished, setShowUnpublished] = useState(false);
    const [getUserSession] = useUserSession();
    const blogPostsAreLoading = useDataLoader(() => fetchBlogPostList({
        userToken: getUserSession()?.token,
        unpublished: showUnpublished,
    }), setBlogPostList, [showUnpublished]);

    return (
        <Page title="Blog">
            <Article pageDescriptor={pagesDescriptors.BLOG}>
                <BlogToolBar showUnpublished={showUnpublished} onShowUnpublishedChange={setShowUnpublished} />

                {blogPostsAreLoading ? <Loader /> : null}

                {!blogPostsAreLoading && blogPostList?.blogPosts?.length > 0
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
                                            sm: 1
                                        },
                                    },
                                    '& > div:nth-of-type(even)': {
                                        paddingLeft: {
                                            xs: 0,
                                            sm: 1
                                        },
                                    },
                                }}>
                                {blogPostList.blogPosts.map((post) => (
                                    <Box
                                        key={post.slug}
                                        display="flex"
                                        alignItems="stretach"
                                        sx={{
                                            paddingBottom: 2,
                                            width: {
                                                xs: '100%',
                                                sm: '50%',
                                            },
                                        }}>
                                        <BlogPostPreview blogPost={post} />
                                    </Box>
                                ))}
                            </Box>
                        </ContentBlock>
                    )
                    : null}

                {!blogPostsAreLoading && blogPostList?.blogPosts?.length === 0
                    ? <BlogPostsPlaceholder />
                    : null }
            </Article>
        </Page>
    )
};


export {
    BlogPage
};
