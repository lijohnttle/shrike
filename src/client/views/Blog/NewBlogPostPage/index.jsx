import React, { useState } from 'react';
import { Page } from '../../../components/Page';
import { NewBlogPostForm } from '../NewBlogPostForm';
import { NewBlogPostPreview } from '../NewBlogPostPreview';


const NewBlogPostPage = () => {
    const [blogPostTitle, setBlogPostTitle] = useState('');
    const [blogPostDescription, setBlogPostDescription] = useState('');
    const [blogPostContent, setBlogPostContent] = useState('');
    const [blogPostPublish, setBlogPostPublish] = React.useState(false);

    const [isPreviewMode, setIsPreviewMode] = React.useState(false);

    return (
        <Page title="New Blog Post" authenticated>
            {!isPreviewMode ? 
                <NewBlogPostForm
                    blogPostTitle={blogPostTitle}
                    setBlogPostTitle={setBlogPostTitle}
                    blogPostDescription={blogPostDescription}
                    setBlogPostDescription={setBlogPostDescription}
                    blogPostContent={blogPostContent}
                    setBlogPostContent={setBlogPostContent}
                    blogPostPublish={blogPostPublish}
                    setBlogPostPublish={setBlogPostPublish}
                    onPreview={() => setIsPreviewMode(true)} />
                : null}

            {isPreviewMode ? 
                <NewBlogPostPreview
                    blogPostTitle={blogPostTitle}
                    blogPostContent={blogPostContent}
                    blogPostPublish={blogPostPublish}
                    onEdit={() => setIsPreviewMode(false)} />
                : null}
        </Page>
    );
};


export {
    NewBlogPostPage
};
