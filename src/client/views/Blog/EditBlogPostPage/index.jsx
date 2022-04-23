import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Page } from '../../../components/Page';
import { useUserSession } from '../../../hooks';
import { EditBlogPostForm } from '../EditBlogPostForm';
import { EditBlogPostPreview } from '../EditBlogPostPreview';
import { NotFound } from '../../../views/NotFound';
import { fetchBlogPost, saveBlogPost } from '../../../services/blogService';
import { BlogPostModel } from '../../../models/BlogPostModel';


const EditBlogPostPage = () => {
    const isCancelled = useRef(false);
    const [blogPost, setBlogPost] = useState(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        const session = getUserSession();

        fetchBlogPost(slug, { userSession: session })
            .then(post => {
                if (!isCancelled.current && post) {
                    setBlogPost(new BlogPostModel(post));
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
        }
    };

    const saveHandler = async () => {
        const session = getUserSession();

        try {
            await saveBlogPost(blogPost, { userSession: session });

            navigate(`/blog/${blogPost.slug}`);
        }
        catch (error) {
            console.log(error);
        }
    };

    if (!isLoading && !blogPost) {
        return <NotFound />;
    }

    return (
        <Page title="Edit Blog Post" authenticated>
            {!isLoading && !isPreviewMode ? 
                <EditBlogPostForm
                    mode={EditBlogPostForm.modes.edit}
                    blogPost={blogPost}
                    onChange={changeHandler}
                    onPreview={() => setIsPreviewMode(true)}
                    onSave={saveHandler} />
                : null}

            {!isLoading && isPreviewMode ? 
                <EditBlogPostPreview
                    isCreation={false}
                    blogPostTitle={blogPost.title}
                    blogPostContent={blogPost.content}
                    blogPostPublish={blogPost.publish}
                    onEdit={() => setIsPreviewMode(false)}
                    onSave={saveHandler} />
                : null}
        </Page>
    );
};


export {
    EditBlogPostPage
};
