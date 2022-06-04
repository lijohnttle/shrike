import React, { useState } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Article, BlogPostPreview, ContentBlock, Loader, Page } from '../../../components';
import { BlogToolBar } from '../BlogToolBar';
import { BlogFilter } from '../BlogFilter';
import { BlogFilterProvider } from '../BlogFilterProvider';
import { useDataLoader, useUserSession } from '../../../hooks';
import { fetchBlogPostList } from '../../../services/blogService';
import { BlogFilterModel, BlogFilterSelectionModel, BlogPostListModel } from '../../../models';
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

export function BlogPage() {
    /** @type {[BlogPostListModel, Function]} */
    const [blogPostList, setBlogPostList] = useState();
    const [showUnpublished, setShowUnpublished] = useState(false);
    /** @type {[BlogFilterModel, Function]} */
    const [filter, setFilter] = useState();
    /** @type {[BlogFilterSelectionModel, Function]} */
    const [filterSelection, setFilterSelection] = useState();
    const [getUserSession] = useUserSession();
    const blogPostsAreLoading = useDataLoader(() => fetchBlogPostList({
        userToken: getUserSession()?.token,
        unpublished: showUnpublished,
    }), setBlogPostList, [showUnpublished]);
    const theme = useTheme();
    const displayMode = useMediaQuery(theme.breakpoints.up('md')) ? BlogPostPreview.displayMode.list : BlogPostPreview.displayMode.tiles;

    return (
        <BlogFilterProvider selection={filterSelection} onFilterLoaded={setFilter} onSelectionChanged={setFilterSelection}>
            <Page title="Blog">
                <Article pageDescriptor={pagesDescriptors.BLOG}>
                    <BlogToolBar showUnpublished={showUnpublished} onShowUnpublishedChange={setShowUnpublished} />

                    {!filter || !filterSelection || blogPostsAreLoading ? <Loader /> : null}

                    {!blogPostsAreLoading && blogPostList?.blogPosts?.length > 0
                        ? (
                            <ContentBlock compact>
                                <Box 
                                    display="flex"
                                    flexDireaction="row"
                                    flexWrap="wrap">
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        width="300px"
                                        minHeight="300px"
                                        flexShrink="0">
                                        <BlogFilter
                                            filter={filter}
                                            selection={filterSelection}
                                            onSelectionChanged={setFilterSelection} />
                                    </Box>

                                    <Box display="flex" flexDirection="column" flex="1">
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
                                </Box>
                            </ContentBlock>
                        )
                        : null}

                    {!blogPostsAreLoading && blogPostList?.blogPosts?.length === 0
                        ? <BlogPostsPlaceholder />
                        : null }
                </Article>
            </Page>
        </BlogFilterProvider>
    )
};
