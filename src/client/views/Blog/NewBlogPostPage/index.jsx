import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Page } from '../../../components/Page';
import { useUserSession } from '../../../hooks';
import { AttachmentModel } from '../../../models';
import { BlogPostModel } from '../../../models/BlogPostModel';
import { createBlogPost } from '../../../services/blogService';
import { EditBlogPostForm } from '../EditBlogPostForm';
import { EditBlogPostPreview } from '../EditBlogPostPreview';


const NewBlogPostPage = () => {
    const [blogPost, setBlogPost] = useState(new BlogPostModel({
        title: '',
        slug: '',
        description: '',
        content: '',
        published: false,
    }));
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();

    const changeHandler = (name, value) => {
        switch (name) {
            case 'title':
                setBlogPost(new BlogPostModel({ ...blogPost, title: value }));
                break;
            case 'slug':
                setBlogPost(new BlogPostModel({ ...blogPost, slug: value }));
                break;
            case 'description':
                setBlogPost(new BlogPostModel({ ...blogPost, description: value }));
                break;
            case 'content':
                setBlogPost(new BlogPostModel({ ...blogPost, content: value }));
                break;
            case 'published':
                setBlogPost(new BlogPostModel({ ...blogPost, published: value }));
                break;
            case 'attachments':
                setBlogPost(new BlogPostModel({ ...blogPost, attachments: value }));
                break;
        }
    };

    const saveHandler = async () => {
        const session = getUserSession();

        try {
            await createBlogPost(blogPost, { userSession: session });

            navigate(`/blog/${blogPost.slug}`);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <Page title="New Blog Post" authenticated>
            {!isPreviewMode ? 
                <EditBlogPostForm
                    mode={EditBlogPostForm.modes.create}
                    blogPost={blogPost}
                    onChange={changeHandler}
                    onPreview={() => setIsPreviewMode(true)}
                    onSave={saveHandler} />
                : null}

            {isPreviewMode ? 
                <EditBlogPostPreview
                    isCreation={true}
                    blogPostTitle={blogPost.title}
                    blogPostAttachments={blogPost.attachments}
                    blogPostContent={blogPost.content}
                    blogPostPublish={blogPost.published}
                    onEdit={() => setIsPreviewMode(false)}
                    onSave={saveHandler} />
                : null}
        </Page>
    );
};


export {
    NewBlogPostPage
};
