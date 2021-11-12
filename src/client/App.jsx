import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import ReactGA from 'react-ga';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import { SignInPage } from './components/account/SignInPage';
import { AccountManagementPage } from './views/AccountManagement/AccountManagementPage';
import { CookieConsent } from './components/common';
import { useUserVisitStatistics, usePageScroll } from './components/core/hooks';
import { urlList } from './static.js';

if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('UA-206773204-1');
}

const App = () => {
    useUserVisitStatistics({ ignorePaths: ['/account'] });
    usePageScroll();

    return (
        <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <CookieConsent />

            <Switch>
                <Route path={urlList.ABOUT} component={AboutPage} />
                <Route path={urlList.SIGN_IN} component={SignInPage} />
                <Route path={urlList.ACCOUNT_MANAGEMENT} component={AccountManagementPage} />
                <Route path={urlList.HOME} component={HomePage} />
            </Switch>
        </MuiThemeProvider>
    );
}

export default App;
