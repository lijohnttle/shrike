import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ReadMore } from '@mui/icons-material';
import { BlogPostPreview, InternalLink, Loader } from '../../../components';
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
const renderRecentBlogPosts = (blogPosts) => (
    <>
        <Typography
            variant="h3"
            sx={{
                marginBottom: {
                    xs: 2,
                    sm: 4
                },
            }}>
            RECENT POSTS
        </Typography>

        <Box display="flex" flexDirection="column">
            {/* Top panel */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="stretach"
                sx={{
                    marginBottom: {
                        xs: blogPosts.length > 1 ? 2 : 0,
                    },
                }}>
                {blogPosts.length > 0
                    ? <BlogPostPreview blogPost={blogPosts[0]} showDescription />
                    : null}
            </Box>

            {/* Bottom panel */}
            {blogPosts.length > 1
                ? (
                    <Box
                        display="flex"
                        sx={{
                            flexDirection: {
                                xs: 'column',
                                sm: 'row',
                            },
                        }}>
                        {blogPosts.slice(1).map((blogPost, index) => (
                            <Box
                                key={blogPost.slug}
                                display="flex"
                                flex={1}
                                sx={{
                                    marginBottom: {
                                        xs: index === 0 ? 1 : 0,
                                        sm: 0,
                                    },
                                    marginTop: {
                                        xs: index === 1 ? 1 : 0,
                                        sm: 0,
                                    },
                                    marginRight: {
                                        xs: 0,
                                        sm: index === 0 ? 1 : 0,
                                    },
                                    marginLeft: {
                                        xs: 0,
                                        sm: index === 1 ? 1 : 0,
                                    },
                                }}>
                                <BlogPostPreview blogPost={blogPost} compact />
                            </Box>))
                        }
                    </Box>
                ) : null}
        </Box>

        <InternalLink
            to={pagesDescriptors.BLOG.path}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                marginTop: {
                    xs: 2,
                    sm: 4,
                    md: 8,
                },
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
                border: `1px solid ${colors.text}`,
                color: colors.text,

                '&:hover': {
                    background: colors.active,
                    color: colors.activeText,
                    borderColor: colors.activeText,
                },
            }}>
            SEE MORE <ReadMore sx={{ marginLeft: 1 }} />
        </InternalLink>
    </>
);

/**
 * 
 * @param {Object} param0
 * @param {Boolean} param0.disableBottomGutter Removes bottom padding.
 * @returns {React.ReactNode}
 */
export function BlogSection({
    disableBottomGutter
}) {
    /** @type {[BlogPostListModel, Function]} */
    const [blogPostList, setBlogPostList] = useState();

    const blogPostsAreLoading = useDataLoader(() => fetchBlogPostList({
        take: 3,
    }), setBlogPostList);

    return (
        <SectionWrapper>
            <SectionContentWrapper
                title="BLOG"
                isLoading={blogPostsAreLoading.current}
                disableBottomGutter={disableBottomGutter}>

                {blogPostsAreLoading ? <Loader /> : null}

                {!blogPostsAreLoading
                    ? renderRecentBlogPosts(blogPostList.blogPosts)
                    : null}
            </SectionContentWrapper>
        </SectionWrapper>
    );
};
