import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Loader, Page } from '../../../components';
import { useIsCancelled, useUserSession } from '../../../hooks';
import { EditBlogPostForm, EditMode } from '../EditBlogPostForm';
import { EditBlogPostPreview } from '../EditBlogPostPreview';
import { NotFound } from '../../../views/NotFound';
import { fetchBlogPost, saveBlogPost, deleteBlogPost  } from '../../../services/blogService';
import { BlogPostModel } from '../../../models';
import { getBlogPostUrlPath } from '../../../../utils/urlBuilder';


/**
 * The page to edit a blog post.
 * @param {Object} param0 
 * @param {Boolean} param0.isCreating Determines if the blog is being created instead of being updated.
 * @returns 
 */
const EditBlogPostPage = ({ isCreating }) => {
    const isCancelled = useIsCancelled();
    /** @type {[BlogPostModel, Function]} */
    const [blogPost, setBlogPost] = useState(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (isCreating) {
            setBlogPost(new BlogPostModel({
                title: '',
                slug: '',
                description: '',
                descriptionImage: '',
                category: '',
                content: '',
                published: false,
            }));

            setIsLoading(false);
        }
        else {
            const session = getUserSession();

            fetchBlogPost(slug, { userSession: session })
                .then(post => {
                    if (!isCancelled.current && post) {
                        setBlogPost(new BlogPostModel(post));
                    }
                })
                .catch(error => {
                    if (!isCancelled.current) {
                        console.error(error);
                    }
                })
                .finally(() => {
                    if (!isCancelled.current) {
                        setIsLoading(false);
                    }
                });
        }
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
            case 'category':
                setBlogPost(new BlogPostModel({ ...blogPost, category: value }));
                break;
            case 'series':
                setBlogPost(new BlogPostModel({ ...blogPost, series: value }));
                break;
        }
    };

    const saveHandler = async () => {
        const session = getUserSession();

        try {
            await saveBlogPost(blogPost, isCreating, { userSession: session });

            navigate(getBlogPostUrlPath(blogPost.slug));
        }
        catch (error) {
            console.error(error);
        }
    };

    const deleteHandler = async () => {
        if (isCreating || !window.confirm('Delete blog post?')) {
            return;
        }

        const session = getUserSession();

        try {
            await deleteBlogPost(blogPost.id, { userSession: session });

            navigate(`/blog`);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <Page title="Edit Blog Post" authenticated>
            {isLoading ? <Loader /> : null}

            {!isLoading && !isPreviewMode ? 
                <EditBlogPostForm
                    mode={isCreating ? EditMode.create : EditMode.edit}
                    blogPost={blogPost}
                    onChange={changeHandler}
                    onPreview={() => setIsPreviewMode(true)}
                    onSave={saveHandler}
                    onDelete={deleteHandler} />
                : null}

            {!isLoading && isPreviewMode ? 
                <EditBlogPostPreview
                    mode={isCreating ? EditMode.create : EditMode.edit}
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
