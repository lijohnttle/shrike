import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add as AddIcon } from '@mui/icons-material';
import { BlogPostPreview, Loader } from '../../../components';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { SectionWrapper } from '../SectionWrapper';
import { fetchBlogPostList } from '../../../services/blogService';
import { BlogPostListModel, BlogPostModel } from '../../../models';
import { useDataLoader } from '../../../hooks';
import { colors } from '../../../themes';
import { pagesDescriptors } from '../../../../static';


/**
 * Renders recent blog posts.
 * @param {Object} param0 
 * @param {BlogPostModel[]} param0.blogPosts Blog posts to display.
 * @returns {React.ReactNode}
 */
const RecentBlogPosts = ({ blogPosts }) => {
    return (
        <>
            <Typography variant="h3" sx={{ color: colors.grayText }} marginBottom={4}>
                RECENT
            </Typography>

            <Box
                display="flex"
                sx={{
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                }}>

                {/* Left panel */}
                <Box
                    display="flex"
                    alignItems="stretach"
                    sx={{
                        width: {
                            xs: 'unset',
                            md: blogPosts.length > 1 ? 'calc(100% * 2 / 3)' : 'unset',
                        },
                    }}>
                    <Box
                        display="flex"
                        alignItems="stretach"
                        sx={{
                            marginRight: {
                                xs: 0,
                                md: blogPosts.length > 1 ? 2 : 0,
                            },
                            marginBottom: {
                                xs: blogPosts.length > 1 ? 2 : 0,
                                md: 0,
                            },
                        }}>
                        {blogPosts.length > 0
                            ? <BlogPostPreview blogPost={blogPosts[0]} showDescription />
                            : null}
                    </Box>
                </Box>

                {/* Right panel */}
                {blogPosts.length > 1
                    ? (
                        <Box
                            display="flex"
                            sx={{
                                flexDirection: {
                                    xs: 'column',
                                    sm: 'row',
                                    md: 'column',
                                },
                                width: {
                                    xs: 'unset',
                                    md: 'calc(100% * 1 / 3)',
                                },
                            }}>
                            {blogPosts.slice(1).map((blogPost, index) => (
                                <Box
                                    key={blogPost.slug}
                                    flex="1"
                                    sx={{
                                        marginBottom: {
                                            xs: index === 0 ? 1 : 0,
                                            sm: 0,
                                            md: index === 0 ? 1 : 0,
                                        },
                                        marginTop: {
                                            xs: index === 1 ? 1 : 0,
                                            sm: 0,
                                            md: index === 1 ? 1 : 0,
                                        },
                                        marginRight: {
                                            xs: index === 0 ? 1 : 0,
                                            sm: index === 0 ? 1 : 0,
                                            md: 0,
                                        },
                                        marginLeft: {
                                            xs: index === 1 ? 1 : 0,
                                            sm: index === 1 ? 1 : 0,
                                            md: 0,
                                        },
                                    }}>
                                    <BlogPostPreview blogPost={blogPost} compact />
                                </Box>))
                            }
                        </Box>
                    ) : null}
            </Box>

            <Button
                variant="outlined"
                component={Link}
                to={pagesDescriptors.BLOG.path}
                endIcon={<AddIcon />}
                color="brand"
                sx={{
                    fontSize: '1.2rem',
                    marginTop: 8,
                    marginLeft: {
                        xs: 0,
                        sm: 'auto',
                    },
                    marginRight: {
                        xs: 0,
                        sm: 'auto',
                    },
                    paddingLeft: 4,
                    paddingRight: 4,
                    paddingTop: 1,
                    paddingBottom: 1,
                }}>
                SEE MORE
            </Button>
        </>
    );
};

/**
 * 
 * @param {Object} param0
 * @param {Number} param0.screenHeight
 * @param {Boolean} param0.showScrollToNextSection
 * @returns {React.ReactNode}
 */
export function BlogSection({
    screenHeight,
    showScrollToNextSection,
}) {
    /** @type {[BlogPostListModel, Function]} */
    const [blogPostList, setBlogPostList] = useState();

    const blogPostsAreLoading = useDataLoader(() => fetchBlogPostList({
        take: 3,
    }), setBlogPostList);

    return (
        <SectionWrapper screenHeight={screenHeight} canScrollToNextSection={showScrollToNextSection}>
            <SectionContentWrapper isLoading={blogPostsAreLoading.current} maxWidth="md">
                <Typography variant="h1" fontWeight="bold" marginBottom={4}>
                    BLOG
                </Typography>

                {blogPostsAreLoading ? <Loader /> : null}

                {!blogPostsAreLoading
                    ? <RecentBlogPosts blogPosts={blogPostList.blogPosts} />
                    : null}
            </SectionContentWrapper>
        </SectionWrapper>
    );
};
