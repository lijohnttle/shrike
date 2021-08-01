import fs from 'fs';
import path from 'path';
import { BlogPost } from '../models/BlogPost.js';

const postRefs = [
    // {
    //     id: "1",
    //     urlSlug: "test-blog-post"
    // }
];

const postCache = { };

function getPostFileName(urlSlug) {
    return path.resolve(process.cwd(), `dist/data/blog/posts/${urlSlug}.json`);
}

function getPostContentFileName(urlSlug) {
    return path.resolve(process.cwd(), `dist/data/blog/posts/${urlSlug}.content.txt`);
}

async function getPosts() {
    const loadBlogPostsAsync = postRefs.map((blogPostRef) => loadBlogPost(blogPostRef.urlSlug));
    const posts = await Promise.all(loadBlogPostsAsync);

    posts.sort((a, b) => a.publishedOn - b.publishedOn);

    return posts.filter(t => t.isVisible);
}

async function findBlogPost(selector, includeContent = false) {
    const blogPostRef = postRefs.find(selector);

    if (!blogPostRef) {
        return null;
    }

    return await loadBlogPost(blogPostRef.urlSlug, includeContent);
}

async function loadBlogPost(urlSlug, includeContent = false) {
    let post = postCache[urlSlug];

    if (post) {
        return post;
    }

    const blogPostRaw = await new Promise((resolve, reject) => {
        fs.readFile(getPostFileName(urlSlug), (err, data) => {
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
            fs.readFile(getPostContentFileName(urlSlug), 'utf-8', (err, data) => {
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

    post = new BlogPost(blogPost.id, {
        title: blogPost.title,
        description: blogPost.description,
        content: content,
        publishedOn: blogPost.publishedOn,
        isVisible: blogPost.isVisible,
        urlSlug: blogPost.urlSlug
    });

    postCache[urlSlug] = post;

    return post;
}

export default {
    getPosts: async () => await getPosts(),
    getPostPreview: async (id) => await findBlogPost(t => t.id === id),
    getPostPreviewByUrl: async (urlSlug) => await findBlogPost(t => t.urlSlug === urlSlug),
    getPost: async (id) => await findBlogPost(t => t.id === id, true),
    getPostByUrl: async (urlSlug) => await findBlogPost(t => t.urlSlug === urlSlug, true)
}