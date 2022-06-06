import React from 'react';
import { Box, Typography } from '@mui/material';
import { BlogPostModel } from '../../models';
import { BlogMarkdown, BlogPostImage, InternalLink } from '../.';
import { colors } from '../../themes';
import { getBlogPostUrlPath } from '../../../utils/urlBuilder';


/**
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 */
 function RenderDescriptionImage({ blogPost }) {
    if (!blogPost?.descriptionImage) {
        return null;
    }

    return (
        <BlogPostImage src={blogPost.descriptionImage} blogPost={blogPost} />
    );
}

/**
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 */
function RenderDescription({ blogPost }) {
    if (!blogPost?.description) {
        return null;
    }

    return (
        <Typography
            variant="body1"
            fontStyle="italic"
            marginBottom={3}
            paddingTop={1}
            paddingBottom={1}
            paddingLeft={2}
            paddingRight={2}
            sx={{
                background: colors.backgroundComplementary,
                color: colors.textComplementary,
            }}>
            {blogPost.description}
        </Typography>
    );
}

/**
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 * @returns 
 */
function RenderSeries({ blogPost }) {
    if (!blogPost) {
        return null;
    }

    /** @type {BlogPostModel[]} */
    let blogPostSeries = blogPost.seriesPreviews || [];

    if (blogPostSeries.length == 0) {
        return null;
    }

    blogPostSeries = [...blogPostSeries, blogPost]
        .sort((a, b) => {
            if (!a && !b) {
                return 0;
            }
            else if (!a) { 
                return 1;
            }
            else if (!b) {
                return -1;
            }

            return a.publishedOn - b.publishedOn;
        });
    
    return (
        <Box marginTop={6} marginBottom={8}>
            <Typography variant="h4">
                Series
            </Typography>

            <ol>
                {blogPostSeries.map((blogPostPreview) => (
                    <li key={blogPostPreview.slug}>
                        {blogPostPreview.slug === blogPost.slug
                            ? (
                                <b>{blogPostPreview.title}</b>
                            )
                            : (
                                <InternalLink to={getBlogPostUrlPath(blogPostPreview.slug)}>
                                    {blogPostPreview.title}
                                </InternalLink>
                            )}

                        
                    </li>
                ))}
            </ol>
        </Box>
    );
}

/**
 * Represents ba blog post.
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost
 * @returns 
 */
export function BlogPostContent({ blogPost }) {
    return (
        <div>
            <RenderDescriptionImage blogPost={blogPost} />
            <RenderDescription blogPost={blogPost} />
            <RenderSeries blogPost={blogPost} />

            <BlogMarkdown blogPost={blogPost} />
        </div>
    );
}
