import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { SectionWrapper } from '../SectionWrapper';
import { fetchBlogPostList } from '../../../services/blogService';
import { BlogPostModel } from '../../../models';
import { useDataLoader } from '../../../hooks';


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
    /** @type {[BlogPostModel[], Function]} */
    const [blogPosts, setBlogPosts] = useState([]);

    const blogPostsAreLoading = useDataLoader(fetchBlogPostList({

    }), setBlogPosts);

    return (
        <SectionWrapper screenHeight={props.screenHeight} canScrollToNextSection={props.showScrollToNextSection}>
            <SectionContentWrapper isLoading={blogPostsAreLoading.current} maxWidth="md">
                <Typography variant="h1" fontWeight="bold" gutterBottom>
                    BLOG
                </Typography>

                <Box>
                    {!blogPostsAreLoading.current
                        ? blogPosts?.map((blogPost) => {
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
