const urlList = {
    HOME: '/',
    ABOUT: '/about',
    SIGN_IN: '/management/signin',
    ACCOUNT_MANAGEMENT: '/management/account',
    BLOG: '/blog',
    BLOG_POST: '/blog/:slug',
    NEW_BLOG_POST: '/management/blog/new',
};

const cookieKeys = {
    AUTH_TOKEN: 'auth-token',
    AUTH_USERNAME: 'auth-username',
};


export {
    urlList,
    cookieKeys
};
