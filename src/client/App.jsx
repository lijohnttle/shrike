import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import ReactGA from 'react-ga';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import { SignInPage } from './components/account/SignInPage';
import AccountManagementPage from './components/account/AccountManagementPage';
import { CookieConsent } from './components/common';
import { useUserVisitStatistics, usePageScroll } from './components/core/hooks';

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
                <Route path="/about" component={AboutPage} />
                <Route path="/account/signin" component={SignInPage} />
                <Route path="/account/management" component={AccountManagementPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </MuiThemeProvider>
    );
}

export default App;
