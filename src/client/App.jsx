import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import ReactGA from 'react-ga';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import ScrollToTopOnRouteChanged from './components/common/behaviours/ScrollToTopOnRouteChanged';

// if (process.env.NODE_ENV === 'production') {
//     ReactGA.initialize('G-24ET7FFQTH');
// }

ReactGA.initialize('G-24ET7FFQTH');

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <ScrollToTopOnRouteChanged />

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

export default App;