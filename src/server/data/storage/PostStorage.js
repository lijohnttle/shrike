import fs from 'fs';
import path from 'path';
import { BlogPost } from '../models/BlogPost';

function getPostFileName(urlSlug) {
    return path.resolve(process.cwd(), `data/blog/posts/${urlSlug}.json`);
}

function getPostContentFileName(urlSlug) {
    return path.resolve(process.cwd(), `data/blog/posts/${urlSlug}.content.txt`);
}

async function findBlogPost(selector, includeContent = false) {
    const blogPostRef = postRefs.find(selector);

    if (!blogPostRef) {
        return null;
    }

    const blogPostRaw = await new Promise((resolve, reject) => {
        fs.readFile(getPostFileName(blogPostRef.urlSlug), (err, data) => {
            if (err) {
                if (process.env.NODE_ENV === 'production') {
                    reject(new Error('File not found'));
                }
                else {
                    reject(err);
                }
            }
            else resolve(data);
        })
    });
    const blogPost = JSON.parse(blogPostRaw);

    let content = null;

    if (includeContent) {
        content = await new Promise((resolve, reject) => {
            fs.readFile(getPostContentFileName(blogPostRef.urlSlug), 'utf-8', (err, data) => {
                if (err) {
                    if (process.env.NODE_ENV === 'production') {
                        reject(new Error('File not found'));
                    }
                    else {
                        reject(err);
                    }
                }
                else resolve(data);
            });
        });
    }

    return new BlogPost(blogPost.id, {
        title: blogPost.title,
        description: blogPost.description,
        content: content,
        publishedOn: blogPost.publishedOn,
        isVisible: blogPost.isVisible,
        urlSlug: blogPost.urlSlug
    });
}

const postRefs = [
    {
        id: "1",
        urlSlug: "test-blog-post"
    }
];

export default {
    postRefs: postRefs,
    getPostPreview: async (id) => await findBlogPost(t => t.id === id),
    getPostPreviewByUrl: async (urlSlug) => await findBlogPost(t => t.urlSlug === urlSlug),
    getPost: async (id) => await findBlogPost(t => t.id === id, true),
    getPostByUrl: async (urlSlug) => await findBlogPost(t => t.urlSlug === urlSlug, true)
}