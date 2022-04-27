import { PageDescriptiorModel } from './client/models';

export const pagesDescriptions = {
    HOME: new PageDescriptiorModel({
        name: 'HOME',
        title: 'Home',
        path: '/',
    }),
    ABOUT: new PageDescriptiorModel({
        name: 'ABOUT',
        title: 'About',
        path: '/about',
    }),
    SIGN_IN: new PageDescriptiorModel({
        name: 'SIGN_IN',
        title: 'Sign In',
        path: '/management/signin',
    }),
    ACCOUNT_MANAGEMENT: new PageDescriptiorModel({
        name: 'ACCOUNT_MANAGEMENT',
        title: 'Account Management',
        path: '/management/account',
    }),
    BLOG: new PageDescriptiorModel({
        name: 'BLOG',
        title: 'Blog',
        path: '/blog',
    }),
    BLOG_POST: new PageDescriptiorModel({
        name: 'BLOG_POST',
        title: 'Blog Post',
        path: '/blog/:slug',
    }),
    BLOG_POST_NEW: new PageDescriptiorModel({
        name: 'BLOG_POST_NEW',
        title: 'New Blog Post',
        path: '/management/blog/new',
    }),
    BLOG_POST_EDIT: new PageDescriptiorModel({
        name: 'BLOG_POST_EDIT',
        title: 'Edit Blog Post',
        path: '/management/blog/edit/:slug',
    }),
};

const urlList = {
    HOME: '/',
    ABOUT: '/about',
    SIGN_IN: '/management/signin',
    ACCOUNT_MANAGEMENT: '/management/account',
    BLOG: '/blog',
    BLOG_POST: '/blog/:slug',
    BLOG_POST_NEW: '/management/blog/new',
    BLOG_POST_EDIT: '/management/blog/edit/:slug',
};

const contentUrlList = {
    BLOG_POST: '/content/blog/:slug/attachments/:name',
};

const cookieKeys = {
    AUTH_TOKEN: 'auth-token',
    AUTH_USERNAME: 'auth-username',
};


export {
    urlList,
    contentUrlList,
    cookieKeys
};
