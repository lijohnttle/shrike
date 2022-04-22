import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom'
import { useUserSession } from '../../../hooks';
import { queryData } from '../../../services/api';
import { Article } from '../../../components/Article';
import { ContentBlock } from '../../../components/ContentBlock';
import { NotFound } from '../../../views/NotFound';
import { Page } from '../../../components/Page';
import { BlogPostToolBar } from '../BlogPostToolBar';


const loadBlogPost = async (slug, session) => {
    try {
        const response = await queryData(`
            query {
                blogPost(
                    slug: "${slug}",
                    accessToken: "${session?.token || ''}")
                {
                    success
                    blogPost {
                        metadata {
                            title
                            slug
                            description
                            createdOn
                            updatedOn
                            publishedOn
                            published
                        }
                        content
                    }
                    errorMessage
                }
            }
        `);

        if (response.blogPost?.success === true) {
            const post = response.blogPost.blogPost;

            if (!post) {
                return null;
            }

            const postMetadata = post.metadata;

            postMetadata.createdOn = new Date(Date.parse(postMetadata.createdOn));
            postMetadata.updatedOn = new Date(Date.parse(postMetadata.updatedOn));

            if (postMetadata.publishedOn) {
                postMetadata.publishedOn = new Date(Date.parse(postMetadata.publishedOn));
            }

            return {
                ...postMetadata,
                content: post.content,
            };
        }
    }
    catch (error) {
        console.error(error);
    }

    return null;
}

const BlogPostPage = () => {
    const isCancelled = useRef(false);
    const [blogPost, setBlogPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { slug } = useParams();
    const [getUserSession] = useUserSession();

    useEffect(() => {
        const session = getUserSession();

        loadBlogPost(slug, session)
            .then((post) => {
                if (!isCancelled.current) {
                    setBlogPost(post);
                }
            })
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
