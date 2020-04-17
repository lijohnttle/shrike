import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import { HomePage } from './components/home/HomePage';
import { CvPage } from './components/cv/CvPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import ScrollToTopOnRouteChanged from './components/common/ScrollToTopOnRouteChanged';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <ScrollToTopOnRouteChanged />

                <Switch>
                    <Route path="/cv">
                        <CvPage />
                    </Route>

                    <Route path="/projects">
                        <ProjectsPage />
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