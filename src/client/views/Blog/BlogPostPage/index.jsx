import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { AccessTimeOutlined, FolderOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useIsCancelled, useUserSession } from '../../../hooks';
import { Article, BlogMarkdown, BlogPostImage, ContentBlock, Page } from '../../../components';
import { NotFound } from '../../../views/NotFound';
import { BlogPostToolBar } from '../BlogPostToolBar';
import { fetchBlogPost } from '../../../services/blogService';
import { BlogPostModel } from '../../../models';
import { pagesDescriptors } from '../../../../static';
import { Helmet } from 'react-helmet';
import { getBlogPostAttachmentUrlPath, getBlogPostUrlPath } from '../../../../utils/urlBuilder';
import { Typography } from '@mui/material';
import { colors } from '../../../themes';


/**
 * @param {BlogPostModel} blogPost 
 * @param {UserSessionModel} session 
 * @return {String}
 */
function buildSubTitle(blogPost, session) {
    if (!blogPost) {
        return '';
    }

    const publishedDate = blogPost.publishedOn
        ? blogPost.publishedOn.toLocaleDateString(undefined, { dateStyle: 'long' }).toUpperCase()
        : 'NOT PUBLISHED';

    return (
        <>
            <span>
                <AccessTimeOutlined sx={{ verticalAlign: 'text-bottom', marginRight: 1 }} />
                <span>
                    {publishedDate}
                </span>
            </span>

            {blogPost.category
                ? (
                    <span>
                        <span>{'\u00a0\u00a0•\u00a0\u00a0'}</span>
                        <FolderOutlined sx={{ verticalAlign: 'text-bottom', marginRight: 1 }} />
                        <span>
                            {blogPost.category.toUpperCase()}
                        </span>
                    </span>
                )
                : null}

            {session
                ? (
                    <span>
                        <span>{'\u00a0\u00a0•\u00a0\u00a0'}</span>
                        <VisibilityOutlined sx={{ verticalAlign: 'text-bottom', marginRight: 1 }} />
                        <span>
                            {blogPost.visits || 0}
                        </span>
                    </span>
                )
                : null}
        </>
    );
}


/**
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 * @returns 
 */
function RenderDescriptionImage({ blogPost }) {
    if (!blogPost.descriptionImage) {
        return null;
    }

    return (
        <BlogPostImage src={blogPost.descriptionImage} blogPost={blogPost} />
    );
}

/**
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 * @returns 
 */
function RenderDescription({ blogPost }) {
    if (!blogPost.description) {
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

export function BlogPostPage() {
    const isCancelled = useIsCancelled();
    /** @type {[BlogPostModel, Function]} */
    const [blogPost, setBlogPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const [getUserSession] = useUserSession();

    useEffect(() => {
        const session = getUserSession();

        fetchBlogPost(slug, { userSession: session })
            .then(post => {
                if (!isCancelled.current) {
                    setBlogPost(post);
                }
            })
            .catch(error => {
                if (!isCancelled.current) {
                    console.log(error)
                }
            })
            .finally(() => {
                if (!isCancelled.current) {
                    setIsLoading(false);
                }
            });
    }, []);

    if (!isLoading && !blogPost) {
        return <NotFound />;
    }

    const userSession = getUserSession();

    return (
        <Page title={blogPost?.title || (isLoading ? 'Loading...' : '')}>
            {blogPost
                ? (
                    <Helmet>
                        <meta property="og:url" content={`${window.location.origin}${getBlogPostUrlPath(blogPost.slug)}`} />
                        <meta property="og:type" content="article" />
                        <meta property="og:title" content={blogPost.title} />
                        <meta property="og:description" content={blogPost.description} />
                        <meta property="og:image" content={`${window.location.origin}${getBlogPostAttachmentUrlPath(blogPost.slug, blogPost.descriptionImage)}`} />
                    </Helmet>
                ) : null}

            <Article
                pageDescriptor={pagesDescriptors.BLOG_POST}
                title={(blogPost?.title || '').toUpperCase()}
                subTitle={buildSubTitle(blogPost, userSession)}
                titleMaxWidth="md">
                {!isLoading ? <BlogPostToolBar slug={blogPost.slug} maxWidth="md" /> : null}

                <ContentBlock compact maxWidth="md">
                    {!isLoading ? (
                    <>
                        <RenderDescriptionImage blogPost={blogPost} />

                        <RenderDescription blogPost={blogPost} />

                        <BlogMarkdown blogPost={blogPost} />
                    </>

                    ) : null}
                </ContentBlock>
            </Article>
        </Page>
    );
};
