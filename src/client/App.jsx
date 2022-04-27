import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { defaultTheme } from './themes';
import ReactGA from 'react-ga';
import { HomePage } from './views/Home/HomePage';
import { AboutPage } from './views/About/AboutPage';
import { SignInPage } from './views/SignIn/SignInPage';
import { AccountManagementPage } from './views/AccountManagement/AccountManagementPage';
import { BlogPage } from './views/Blog/BlogPage';
import { BlogPostPage } from './views/Blog/BlogPostPage';
import { EditBlogPostPage } from './views/Blog/EditBlogPostPage';
import { NewBlogPostPage } from './views/Blog/NewBlogPostPage';
import { CookieConsent } from './components/CookieConsent';
import { useUserVisitStatistics, usePageScroll } from './hooks';
import { urlList,  } from '../static.js';
import { NotFound } from './views/NotFound';


if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('UA-206773204-1');
}

const App = () => {
    useUserVisitStatistics({ ignorePaths: ['/management'] });
    usePageScroll();

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <CookieConsent />

            <Routes>
                <Route path={urlList.ABOUT} element={<AboutPage />} />
                <Route path={urlList.SIGN_IN} element={<SignInPage />} />
                <Route path={urlList.ACCOUNT_MANAGEMENT} element={<AccountManagementPage />} />
                <Route path={urlList.BLOG_POST_NEW} element={<NewBlogPostPage />} />
                <Route path={urlList.BLOG_POST_EDIT} element={<EditBlogPostPage />} />
                <Route path={urlList.BLOG} element={<BlogPage />} />
                <Route path={urlList.BLOG_POST} element={<BlogPostPage />} />
                <Route path={urlList.HOME} element={<HomePage />} />
                <Route element={<NotFound />} />
            </Routes>
        </ThemeProvider >
    );
}


export default App;
