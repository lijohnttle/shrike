import React, { useState } from 'react';
import { Loader } from '../../../components';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { SectionWrapper } from '../SectionWrapper';
import { fetchBlogPostList } from '../../../services/blogService';
import { useDataLoader } from '../../../hooks';


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
    const [blogSummary, setBlogPostList] = useState();

    const blogPostsAreLoading = useDataLoader(() => fetchBlogPostList({
        take: 3,
    }), setBlogPostList);

    return (
        <SectionWrapper>
            <SectionContentWrapper
                title="BLOG"
                isLoading={blogPostsAreLoading.current}
                disableBottomGutter={disableBottomGutter}>

                {/* {blogPostsAreLoading ? <Loader /> : null}

                {!blogPostsAreLoading
                    ? renderRecentBlogPosts(blogPostList.blogPosts)
                    : null} */}
            </SectionContentWrapper>
        </SectionWrapper>
    );
};
