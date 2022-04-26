import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Page } from '../../../components/Page';
import { useUserSession } from '../../../hooks';
import { EditBlogPostForm, EditMode } from '../EditBlogPostForm';
import { EditBlogPostPreview } from '../EditBlogPostPreview';
import { NotFound } from '../../../views/NotFound';
import { fetchBlogPost, saveBlogPost, deleteBlogPost } from '../../../services/blogService';
import { BlogPostModel } from '../../../models';


const EditBlogPostPage = () => {
    const isCancelled = useRef(false);
    /** @type {[BlogPostModel, Function]} Loading */
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

    if (!isLoading && !blogPost) {
        return <NotFound />;
    }

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
            await saveBlogPost(blogPost, { userSession: session });

            navigate(`/blog/${blogPost.slug}`);
        }
        catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = async () => {
        if (!window.confirm('Delete blog post?')) {
            return;
        }

        const session = getUserSession();

        try {
            await deleteBlogPost(blogPost.id, { userSession: session });

            navigate(`/blog`);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <Page title="Edit Blog Post" authenticated>
            {!isLoading && !isPreviewMode ? 
                <EditBlogPostForm
                    mode={EditMode.edit}
                    blogPost={blogPost}
                    onChange={changeHandler}
                    onPreview={() => setIsPreviewMode(true)}
                    onSave={saveHandler}
                    onDelete={deleteHandler} />
                : null}

            {!isLoading && isPreviewMode ? 
                <EditBlogPostPreview
                    mode={EditMode.edit}
                    blogPost={blogPost}
                    onChange={changeHandler}
                    onEdit={() => setIsPreviewMode(false)}
                    onSave={saveHandler}
                    onDelete={deleteHandler} />
                : null}
        </Page>
    );
};


export {
    EditBlogPostPage
};
