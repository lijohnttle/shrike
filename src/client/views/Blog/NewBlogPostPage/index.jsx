import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Page } from '../../../components/Page';
import { useUserSession } from '../../../hooks';
import { queryData } from '../../../services/api';
import { NewBlogPostForm } from '../NewBlogPostForm';
import { NewBlogPostPreview } from '../NewBlogPostPreview';


const NewBlogPostPage = () => {
    const [blogPostTitle, setBlogPostTitle] = useState('');
    const [blogPostSlug, setBlogPostSlug] = useState('');
    const [blogPostDescription, setBlogPostDescription] = useState('');
    const [blogPostContent, setBlogPostContent] = useState('');
    const [blogPostPublish, setBlogPostPublish] = React.useState(false);
    const [getUserSession] = useUserSession();
    const history = useHistory();

    const [isPreviewMode, setIsPreviewMode] = React.useState(false);

    const createHandler = async () => {
        try {
            const session = getUserSession();

            const response = await queryData(`
                mutation {
                    createBlogPost(
                        blogPost: {
                            title: "${blogPostTitle}",
                            slug: "${blogPostSlug}",
                            description: "${blogPostDescription}",
                            content: "${blogPostContent}",
                            publish: ${blogPostPublish}
                        },
                        accessToken: "${session.token}")
                    {
                        success
                        errorMessage
                    }
                }
            `);

            if (response.createBlogPost?.success === true) {
                history.push(`/blog/${blogPostSlug}`);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <Page title="New Blog Post" authenticated>
            {!isPreviewMode ? 
                <NewBlogPostForm
                    blogPostTitle={blogPostTitle}
                    setBlogPostTitle={setBlogPostTitle}
                    blogPostSlug={blogPostSlug}
                    setBlogPostSlug={setBlogPostSlug}
                    blogPostDescription={blogPostDescription}
                    setBlogPostDescription={setBlogPostDescription}
                    blogPostContent={blogPostContent}
                    setBlogPostContent={setBlogPostContent}
                    blogPostPublish={blogPostPublish}
                    setBlogPostPublish={setBlogPostPublish}
                    onPreview={() => setIsPreviewMode(true)}
                    onCreate={createHandler} />
                : null}

            {isPreviewMode ? 
                <NewBlogPostPreview
                    blogPostTitle={blogPostTitle}
                    blogPostContent={blogPostContent}
                    blogPostPublish={blogPostPublish}
                    onEdit={() => setIsPreviewMode(false)}
                    onCreate={createHandler} />
                : null}
        </Page>
    );
};


export {
    NewBlogPostPage
};
