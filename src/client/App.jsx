import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import ReactGA from 'react-ga';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import { withResettableNavigation } from './components/core';
import { CookieConsent } from './components/common';

if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('UA-206773204-1');
}

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <CookieConsent />

                <Switch>
                    <Route path="/about">
                        <AboutPage />
                    </Route>

                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </MuiThemeProvider>
        );
    }
}

export default withResettableNavigation(App);