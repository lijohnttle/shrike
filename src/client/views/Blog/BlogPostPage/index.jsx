import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom'
import { useUserSession } from '../../../hooks';
import { Article } from '../../../components/Article';
import { ContentBlock } from '../../../components/ContentBlock';
import { NotFound } from '../../../views/NotFound';
import { Page } from '../../../components/Page';
import { BlogPostToolBar } from '../BlogPostToolBar';
import { fetchBlogPost } from '../../../services/blogService';


const BlogPostPage = () => {
    const isCancelled = useRef(false);
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

            return () => {
                isCancelled.current = true;
            };
    }, []);

    if (!isLoading && !blogPost) {
        return <NotFound />;
    }

    return (
        <Page title={blogPost?.title || (isLoading ? 'Loading...' : '')}>
            <Article title={blogPost?.title || ''}>
                {!isLoading ? <BlogPostToolBar slug={blogPost.slug} /> : null}

                <ContentBlock>
                    {!isLoading ? <ReactMarkdown children={blogPost.content} /> : null}
                </ContentBlock>
            </Article>
        </Page>
    );
};


export {
    BlogPostPage
};
