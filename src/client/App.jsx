import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import { HomePage } from './components/home/HomePage';
import { CvPage } from './components/cv/CvPage';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />

                <Switch>
                    <Route path="/cv">
                        <CvPage />
                    </Route>

                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </MuiThemeProvider>
        );
    }
}

export { App };