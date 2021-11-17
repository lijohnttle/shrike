import React from 'react';
import { Article } from '../../../components/Article';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { Page } from '../../../components/Page';


const BlogPostPage = () => {
    return (
        <Page title="Blog Post">
            <Article title="BLOG POST" topGutter>
                <ArticleContentBlock>
                    The page is in development
                </ArticleContentBlock>
            </Article>
        </Page>
    );
};


export {
    BlogPostPage
};
