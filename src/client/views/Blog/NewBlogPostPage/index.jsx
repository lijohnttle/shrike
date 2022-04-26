import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { getBlogPostUrl } from '../../../../utils/urlBuilder';
import { Page } from '../../../components/Page';
import { useUserSession } from '../../../hooks';
import { BlogPostModel } from '../../../models/BlogPostModel';
import { createBlogPost } from '../../../services/blogService';
import { EditBlogPostForm, EditMode } from '../EditBlogPostForm';
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
            case 'descriptionImage':
                setBlogPost(new BlogPostModel({ ...blogPost, descriptionImage: value }));
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

            navigate(getBlogPostUrl(blogPost.slug));
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <Page title="New Blog Post" authenticated>
            {!isPreviewMode ? 
                <EditBlogPostForm
                    mode={EditMode.create}
                    blogPost={blogPost}
                    onChange={changeHandler}
                    onPreview={() => setIsPreviewMode(true)}
                    onSave={saveHandler} />
                : null}

            {isPreviewMode ? 
                <EditBlogPostPreview
                    mode={EditMode.create}
                    blogPost={blogPost}
                    onChange={changeHandler}
                    onEdit={() => setIsPreviewMode(false)}
                    onSave={saveHandler} />
                : null}
        </Page>
    );
};


export {
    NewBlogPostPage
};
