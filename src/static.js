import { PageDescriptorModel } from './client/models';

const pagesDescriptors = {
    HOME: new PageDescriptorModel({
        name: 'HOME',
        title: 'Home',
        path: '/',
    }),
    ABOUT: new PageDescriptorModel({
        name: 'ABOUT',
        title: 'About Me',
        path: '/about',
        parent: 'HOME',
    }),
    SIGN_IN: new PageDescriptorModel({
        name: 'SIGN_IN',
        title: 'Sign In',
        path: '/management/signin',
        parent: 'HOME',
    }),
    ACCOUNT_MANAGEMENT: new PageDescriptorModel({
        name: 'ACCOUNT_MANAGEMENT',
        title: 'Account Management',
        path: '/management/account',
        parent: 'HOME',
    }),
    BLOG: new PageDescriptorModel({
        name: 'BLOG',
        title: 'Blog',
        path: '/blog',
        parent: 'HOME',
    }),
    BLOG_POST: new PageDescriptorModel({
        name: 'BLOG_POST',
        title: 'Blog Post',
        path: '/blog/:slug',
        parent: 'BLOG',
    }),
    BLOG_POST_NEW: new PageDescriptorModel({
        name: 'BLOG_POST_NEW',
        title: 'New Blog Post',
        path: '/management/blog/new',
        parent: 'BLOG',
    }),
    BLOG_POST_EDIT: new PageDescriptorModel({
        name: 'BLOG_POST_EDIT',
        title: 'Edit Blog Post',
        path: '/management/blog/edit/:slug',
        parent: 'BLOG',
    }),
};

const contentUrlList = {
    BLOG_POST: '/content/blog/:slug/attachments/:name',
};

const cookieKeys = {
    AUTH_TOKEN: 'auth-token',
    AUTH_USERNAME: 'auth-username',
};


export {
    pagesDescriptors,
    contentUrlList,
    cookieKeys
};
