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

const cookieKeys = {
    AUTH_TOKEN: 'auth-token',
    AUTH_USERNAME: 'auth-username',
};


export {
    urlList,
    cookieKeys
};
