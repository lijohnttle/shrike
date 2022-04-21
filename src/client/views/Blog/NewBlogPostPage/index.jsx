import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Page } from '../../../components/Page';
import { useUserSession } from '../../../hooks';
import { queryData } from '../../../services/api';
import { EditBlogPostForm } from '../EditBlogPostForm';
import { EditBlogPostPreview } from '../EditBlogPostPreview';


const NewBlogPostPage = () => {
    const [blogPostTitle, setBlogPostTitle] = useState('');
    const [blogPostSlug, setBlogPostSlug] = useState('');
    const [blogPostDescription, setBlogPostDescription] = useState('');
    const [blogPostContent, setBlogPostContent] = useState('');
    const [blogPostPublish, setBlogPostPublish] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [getUserSession] = useUserSession();
    const history = useNavigate();


    const saveHandler = async () => {
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
                <EditBlogPostForm
                    isCreation={true}
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
                    onSave={saveHandler} />
                : null}

            {isPreviewMode ? 
                <EditBlogPostPreview
                    isCreation={true}
                    blogPostTitle={blogPostTitle}
                    blogPostContent={blogPostContent}
                    blogPostPublish={blogPostPublish}
                    onEdit={() => setIsPreviewMode(false)}
                    onSave={saveHandler} />
                : null}
        </Page>
    );
};


export {
    NewBlogPostPage
};
