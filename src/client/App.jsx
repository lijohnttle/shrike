import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { defaultTheme } from './themes';
import ReactGA from 'react-ga';
import HomePage from './components/home/HomePage';
import { AboutPage } from './views/About';
import { SignInPage } from './views/SignIn/SignInPage';
import { AccountManagementPage } from './views/AccountManagement/AccountManagementPage';
import { BlogPage } from './views/Blog/BlogPage';
import { CookieConsent } from './components/common';
import { useUserVisitStatistics, usePageScroll } from './components/core/hooks';
import { urlList } from '../static.js';


if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('UA-206773204-1');
}

const App = () => {
    useUserVisitStatistics({ ignorePaths: ['/account'] });
    usePageScroll();

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <CookieConsent />

            <Switch>
                <Route path={urlList.ABOUT} component={AboutPage} />
                <Route path={urlList.SIGN_IN} component={SignInPage} />
                <Route path={urlList.ACCOUNT_MANAGEMENT} component={AccountManagementPage} />
                <Route path={urlList.BLOG} component={BlogPage} />
                <Route path={urlList.HOME} component={HomePage} />
            </Switch>
        </ThemeProvider >
    );
}


export default App;
