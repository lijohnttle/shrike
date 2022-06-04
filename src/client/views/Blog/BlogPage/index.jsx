import React, { useState } from 'react';
import { Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Article, BlogPostPreview, ContentBlock, Loader, Page } from '../../../components';
import { BlogToolBar } from '../BlogToolBar';
import { BlogFilter } from '../BlogFilter';
import { BlogFilterProvider } from '../BlogFilterProvider';
import { useDataLoader, useUserSession } from '../../../hooks';
import { fetchBlogPostList } from '../../../services/blogService';
import { BlogFilterModel, BlogFilterSelectionModel, BlogPostListModel } from '../../../models';
import { Box } from '@mui/system';
import { pagesDescriptors } from '../../../../static';
import { colors } from '../../../themes';


const RenderBlogPostsPlaceholder = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" paddingTop={8}>
            <Search sx={{ color: colors.grayText, fontSize: '72px', marginBottom: 2 }} />

            <Typography variant="h3" align="center" sx={{ color: colors.grayText }}>
                NO RESULTS
            </Typography>
        </Box>
    );
};

/**
 * @param {Object} param0 
 * @param {BlogFilterModel} param0.filter 
 * @param {BlogFilterSelectionModel} param0.filterSelection
 * @param {Function} param0.setFilterSelection
 * @param {Boolean} param0.isOpen
 * @param {Boolean} param0.setIsOpen
 * @returns 
 */
function RenderFilterAsDrawer({ filter, filterSelection, setFilterSelection, isOpen, setIsOpen }) {
    return (
        <Drawer
            anchor="left"
            open={isOpen}
            PaperProps={{
                sx: {
                    width: '75%',
                    maxWidth: '250px',
                    paddingLeft: 2,
                    paddingRight: 2,
                    paddingTop: 4,
                    paddingBottom: 4,
                },
            }}
            onClose={() => setIsOpen(false)}>
            <BlogFilter
                filter={filter}
                selection={filterSelection}
                onSelectionChanged={setFilterSelection} />
        </Drawer>
    )
}

/**
 * @param {Object} param0 
 * @param {BlogFilterModel} param0.filter 
 * @param {BlogFilterSelectionModel} param0.filterSelection
 * @param {Function} param0.setFilterSelection
 * @param {Boolean} param0.isOpen
 * @returns 
 */
 function RenderFilterAsPanel({ filter, filterSelection, setFilterSelection, isOpen }) {
    if (!isOpen) {
        return null;
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="250px"
            flexShrink="0"
            marginRight={2}>
            <BlogFilter
                filter={filter}
                selection={filterSelection}
                onSelectionChanged={setFilterSelection} />
        </Box>
    )
}

export function BlogPage() {
    /** @type {[BlogPostListModel, Function]} */
    const [blogPostList, setBlogPostList] = useState();
    /** @type {[BlogFilterModel, Function]} */
    const [filter, setFilter] = useState();
    /** @type {[BlogFilterSelectionModel, Function]} */
    const [filterSelection, setFilterSelection] = useState();
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [getUserSession] = useUserSession();
    const blogPostsAreLoading = useDataLoader(() => {
        return filterSelection
            ? fetchBlogPostList({
                userToken: getUserSession()?.token,
                categories: filterSelection.categories.map(c => c.name),
                unpublished: filterSelection.unpublished,
            })
            : null;
    }, setBlogPostList, [filterSelection]);
    const theme = useTheme();
    const narrowScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const displayMode = narrowScreen ? BlogPostPreview.displayMode.tiles : BlogPostPreview.displayMode.list;

    return (
        <BlogFilterProvider selection={filterSelection} onFilterLoaded={setFilter} onSelectionChanged={setFilterSelection}>
            <Page title="Blog">
                <Article pageDescriptor={pagesDescriptors.BLOG}>
                    <BlogToolBar
                        isFilterOpen={narrowScreen ? isFilterDrawerOpen : isFilterOpen}
                        onFilterToggle={narrowScreen
                            ? () => setIsFilterDrawerOpen(!isFilterDrawerOpen)
                            : () => setIsFilterOpen(!isFilterOpen)} />

                    {!filter || !filterSelection || blogPostsAreLoading ? <Loader /> : null}

                    {!blogPostsAreLoading
                        ? (
                            <ContentBlock compact>
                                <Box 
                                    display="flex"
                                    position="relative"
                                    sx={{
                                        flexDirection: {
                                            xs: 'column',
                                            lg: 'row',
                                        }
                                    }}>
                                    {narrowScreen
                                        ? (
                                            <RenderFilterAsDrawer
                                                filter={filter}
                                                filterSelection={filterSelection}
                                                setFilterSelection={setFilterSelection}
                                                isOpen={isFilterDrawerOpen}
                                                setIsOpen={setIsFilterDrawerOpen} />
                                        )
                                        : (
                                            <RenderFilterAsPanel
                                                filter={filter}
                                                filterSelection={filterSelection}
                                                setFilterSelection={setFilterSelection}
                                                isOpen={isFilterOpen} />
                                        )}

                                    <Box display="flex" flexDirection="column" flex="1">
                                        {blogPostList?.blogPosts?.length > 0
                                            ? blogPostList.blogPosts.map((post) => (
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
                                            ))
                                            : <RenderBlogPostsPlaceholder />}
                                    </Box>
                                </Box>
                            </ContentBlock>
                        )
                        : null}
                </Article>
            </Page>
        </BlogFilterProvider>
    )
};
