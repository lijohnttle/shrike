import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { defaultTheme } from './themes';
import ReactGA from 'react-ga';
import { HomePage } from './views/Home/HomePage';
import { AboutPage } from './views/About/AboutPage';
import { SignInPage } from './views/SignIn/SignInPage';
import { AccountManagementPage } from './views/AccountManagement/AccountManagementPage';
import { BlogPage } from './views/Blog/BlogPage';
import { BlogPostPage } from './views/Blog/BlogPostPage';
import { NewBlogPostPage } from './views/Blog/NewBlogPostPage';
import { CookieConsent } from './components/CookieConsent';
import { useUserVisitStatistics, usePageScroll } from './hooks';
import { urlList } from '../static.js';
import { NotFound } from './components/NotFound';


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

            <Switch>
                <Route exact path={urlList.ABOUT} component={AboutPage} />
                <Route exact path={urlList.SIGN_IN} component={SignInPage} />
                <Route exact path={urlList.ACCOUNT_MANAGEMENT} component={AccountManagementPage} />
                <Route exact path={urlList.NEW_BLOG_POST} component={NewBlogPostPage} />
                <Route exact path={urlList.BLOG} component={BlogPage} />
                <Route exact path={urlList.BLOG_POST} component={BlogPostPage} />
                <Route exact path={urlList.HOME} component={HomePage} />
                <Route component={NotFound} />
            </Switch>
        </ThemeProvider >
    );
}


export default App;
