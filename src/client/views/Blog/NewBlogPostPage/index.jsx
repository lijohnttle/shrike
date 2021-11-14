import React from 'react';
import { Article } from '../../../components/Article';
import { Page } from '../../../components/Page';


const NewBlogPostPage = () => {
    return (
        <Page title="New Blog Post" authenticated>
            <Article title="NEW BLOG POST">

            </Article>
        </Page>
    )
};


export {
    NewBlogPostPage
};
