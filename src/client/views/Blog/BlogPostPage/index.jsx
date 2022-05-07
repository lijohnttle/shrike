import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useIsCancelled, useUserSession } from '../../../hooks';
import { Article, BlogMarkdown, ContentBlock, Page } from '../../../components';
import { NotFound } from '../../../views/NotFound';
import { BlogPostToolBar } from '../BlogPostToolBar';
import { fetchBlogPost } from '../../../services/blogService';
import { BlogPostModel } from '../../../models';
import { pagesDescriptors } from '../../../../static';


/**
 * @param {BlogPostModel} blogPost 
 * @param {UserSessionModel} session 
 * @return {String}
 */
function buildSubTitle(blogPost, session) {
    if (!blogPost) {
        return '';
    }

    const subTitle = [];

    if (blogPost.publishedOn) {
        subTitle.push(blogPost.publishedOn?.toLocaleDateString(undefined, { dateStyle: 'long' }));
    }

    if (!blogPost.published) {
        subTitle.push('Not published');
    }
    
    if (blogPost.category) {
        subTitle.push(blogPost.category);
    }

    if (session) {
        subTitle.push(`Visits: ${blogPost.visits ?? 0}`);
    }

    return subTitle.join('\u00a0\u00a0•\u00a0\u00a0').toUpperCase();
}

const BlogPostPage = () => {
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
            .catch(error => console.log(error))
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
            <Article
                pageDescriptor={pagesDescriptors.BLOG_POST}
                title={(blogPost?.title || '').toUpperCase()}
                subTitle={buildSubTitle(blogPost, userSession)}
                titleMaxWidth="md">
                {!isLoading ? <BlogPostToolBar slug={blogPost.slug} maxWidth="md" /> : null}

                <ContentBlock compact maxWidth="md">
                    {!isLoading ? <BlogMarkdown blogPost={blogPost} /> : null}
                </ContentBlock>
            </Article>
        </Page>
    );
};


export {
    BlogPostPage
};
