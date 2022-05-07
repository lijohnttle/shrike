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
import { CookieConsent } from './components';
import { useUserVisitStatistics, usePageScroll } from './hooks';
import { pagesDescriptors } from '../static.js';
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
                <Route path={pagesDescriptors.ABOUT.path} element={<AboutPage />} />
                <Route path={pagesDescriptors.SIGN_IN.path} element={<SignInPage />} />
                <Route path={pagesDescriptors.ACCOUNT_MANAGEMENT.path} element={<AccountManagementPage />} />
                <Route path={pagesDescriptors.BLOG_POST_NEW.path} element={<EditBlogPostPage isCreating />} />
                <Route path={pagesDescriptors.BLOG_POST_EDIT.path} element={<EditBlogPostPage />} />
                <Route path={pagesDescriptors.BLOG.path} element={<BlogPage />} />
                <Route path={pagesDescriptors.BLOG_POST.path} element={<BlogPostPage />} />
                <Route path={pagesDescriptors.HOME.path} element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ThemeProvider >
    );
}


export default App;
