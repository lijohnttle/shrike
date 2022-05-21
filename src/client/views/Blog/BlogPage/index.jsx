import React, { useState } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
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
    const theme = useTheme();
    const displayMode = useMediaQuery(theme.breakpoints.up('md')) ? BlogPostPreview.displayMode.list : BlogPostPreview.displayMode.tiles;

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
                                flexWrap="wrap">
                                {blogPostList.blogPosts.map((post) => (
                                    <Box
                                        key={post.slug}
                                        display="flex"
                                        alignItems="stretach"
                                        marginBottom={1}
                                        width="100%">
                                        <BlogPostPreview
                                            blogPost={post}
                                            showDescription
                                            displayMode={displayMode} />
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
