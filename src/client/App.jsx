import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import HomePage from './components/home/HomePage';
import ScrollToTopOnRouteChanged from './components/common/behaviours/ScrollToTopOnRouteChanged';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <ScrollToTopOnRouteChanged />

                <Switch>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </MuiThemeProvider>
        );
    }
}

export { App };