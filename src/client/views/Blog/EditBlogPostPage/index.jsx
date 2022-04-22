import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Page } from '../../../components/Page';
import { useUserSession } from '../../../hooks';
import { queryData } from '../../../services/api';
import { EditBlogPostForm } from '../EditBlogPostForm';
import { EditBlogPostPreview } from '../EditBlogPostPreview';
import { NotFound } from '../../../components/NotFound';


const loadBlogPost = async (slug, session) => {
    try {
        const response = await queryData(`
            query {
                blogPost(
                    slug: "${slug}",
                    accessToken: "${session?.token || ''}")
                {
                    success
                    blogPost {
                        metadata {
                            id
                            title
                            slug
                            description
                            createdOn
                            updatedOn
                            publishedOn
                            published
                        }
                        content
                    }
                    errorMessage
                }
            }
        `);

        if (response.blogPost?.success === true) {
            const post = response.blogPost.blogPost;

            if (!post) {
                return null;
            }

            const postMetadata = post.metadata;

            postMetadata.createdOn = new Date(Date.parse(postMetadata.createdOn));
            postMetadata.updatedOn = new Date(Date.parse(postMetadata.updatedOn));

            if (postMetadata.publishedOn) {
                postMetadata.publishedOn = new Date(Date.parse(postMetadata.publishedOn));
            }

            return {
                ...postMetadata,
                content: post.content,
            };
        }
    }
    catch (error) {
        console.error(error);
    }

    return null;
}

const saveBlogPost = async (blogPostId, blogPostTitle, blogPostSlug, blogPostDescription, blogPostContent, blogPostPublish, session) => {
    try {
        const response = await queryData(`
            mutation {
                editBlogPost(
                    blogPost: {
                        id: "${blogPostId}",
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

        return response.editBlogPost?.success === true;
    }
    catch (error) {
        console.error(error);

        return false;
    }
};

const EditBlogPostPage = () => {
    const isCancelled = useRef(false);
    const [blogPostId, setBlogPostId] = useState();
    const [blogPostTitle, setBlogPostTitle] = useState();
    const [blogPostSlug, setBlogPostSlug] = useState();
    const [blogPostDescription, setBlogPostDescription] = useState();
    const [blogPostContent, setBlogPostContent] = useState();
    const [blogPostPublish, setBlogPostPublish] = useState(false);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        const session = getUserSession();

        loadBlogPost(slug, session)
            .then((post) => {
                if (!isCancelled.current && post) {
                    setBlogPostId(post.id);
                    setBlogPostTitle(post.title);
                    setBlogPostSlug(post.slug);
                    setBlogPostDescription(post.description);
                    setBlogPostContent(post.content);
                    setBlogPostPublish(post.published);
                }
            })
            .finally(() => {
                if (!isCancelled.current) {
                    setIsLoading(false);
                }
            });

            return () => {
                isCancelled.current = true;
            };
    }, []);

    const saveHandler = async () => {
        const session = getUserSession();
        const isSaved = await saveBlogPost(blogPostId, blogPostTitle, blogPostSlug, blogPostDescription, blogPostContent, blogPostPublish, session);

        if (isSaved) {
            navigate(`/blog/${blogPostSlug}`);
        }
    };

    if (!isLoading && !blogPostId) {
        return <NotFound />;
    }

    return (
        <Page title="Edit Blog Post" authenticated>
            {!isLoading && !isPreviewMode ? 
                <EditBlogPostForm
                    isCreation={false}
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

            {!isLoading && isPreviewMode ? 
                <EditBlogPostPreview
                    isCreation={false}
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
    EditBlogPostPage
};
