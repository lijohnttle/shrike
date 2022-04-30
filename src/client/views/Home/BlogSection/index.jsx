import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { SectionWrapper } from '../SectionWrapper';
import { fetchBlogPostList } from '../../../services/blogService';
import { BlogPostListModel } from '../../../models';
import { useDataLoader } from '../../../hooks';
import { Loader } from '../../../components';


const RecentBlogMeta = () => {
    return (
        <Box>

        </Box>
    );
};

/**
 * 
 * @param {Object} props
 * @param {Number} props.screenHeight
 * @param {Boolean} props.showScrollToNextSection
 * @returns {React.ReactNode}
 */
const BlogSection = (props) => {
    /** @type {[BlogPostListModel, Function]} */
    const [blogPostList, setBlogPostList] = useState();

    const blogPostsAreLoading = useDataLoader(() => fetchBlogPostList({
        take: 1,
    }), setBlogPostList);

    return (
        <SectionWrapper screenHeight={props.screenHeight} canScrollToNextSection={props.showScrollToNextSection}>
            <SectionContentWrapper isLoading={blogPostsAreLoading.current} maxWidth="md">
                <Typography variant="h1" fontWeight="bold" gutterBottom>
                    BLOG
                </Typography>

                {blogPostsAreLoading ? <Loader /> : null}

                <Box>
                    {!blogPostsAreLoading
                        ? blogPostList?.blogPosts?.map((blogPost) => {
                            return <div key={blogPost.slug}>{blogPost.title}</div>;
                        }) : null}
                </Box>
            </SectionContentWrapper>
        </SectionWrapper>
    );
};


export {
    BlogSection
};
