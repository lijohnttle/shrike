import React, { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { Article } from '../../../components/Article';
import { Page } from '../../../components/Page';
import { BlogPostMeta } from '../BlogPostMeta';
import { BlogToolBar } from '../BlogToolBar';
import { useUserSession } from '../../../hooks';
import { queryData } from '../../../services/api';


async function loadBlogPostsList(session, showUnpublished) {
    try {
        const response = await queryData(`
            query {
                blogPostList(
                    includeUnpublished: ${showUnpublished},
                    accessToken: "${session?.token || ''}")
                {
                    success
                    blogPosts {
                        title
                        slug
                        description
                        createdOn
                        updatedOn
                        publishedOn
                        published
                    }
                    errorMessage
                }
            }
        `);

        if (response.blogPostList?.success === true) {
            return response.blogPostList.blogPosts.map((post) => {
                const result = { ...post };

                result.createdOn = new Date(Date.parse(post.createdOn));
                result.updatedOn = new Date(Date.parse(post.updatedOn));

                if (result.publishedOn) {
                    result.publishedOn = new Date(Date.parse(post.publishedOn));
                }

                return result;
            });
        }
        else {
            console.error(response.blogPostList?.errorMessage);
        }
    }
    catch (error) {
        console.error(error);
    }

    return [];
}

const renderBlogPostsPlaceholder = () => {
    return (
        <ArticleContentBlock compact>
            <Typography variant="h3" align="center">
                There are no posts yet
            </Typography>
        </ArticleContentBlock>
    );
};

const BlogPage = () => {
    const isCancelled = useRef(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [showUnpublished, setShowUnpublished] = useState(false);
    const [getUserSession] = useUserSession();

    useEffect(() => {
        return () => {
            isCancelled.current = true;
        };
    }, []);

    useEffect(() => {
        refreshPosts();
    }, [showUnpublished]);

    const refreshPosts = async () => {
        const session = getUserSession();

        await loadBlogPostsList(session, showUnpublished)
            .then((data) => {
                if (!isCancelled.current) {
                    setBlogPosts(data);
                }
            });
    };

    return (
        <Page title="Blog">
            <Article title="BLOG">
                <BlogToolBar showUnpublished={showUnpublished} setShowUnpublished={setShowUnpublished} />

                {blogPosts.length > 0
                    ? blogPosts.map((post) => (
                        <ArticleContentBlock key={post.slug} compact>
                            <BlogPostMeta post={post} />
                        </ArticleContentBlock>
                    ))
                    : renderBlogPostsPlaceholder()}
            </Article>
        </Page>
    )
};


export {
    BlogPage
};
