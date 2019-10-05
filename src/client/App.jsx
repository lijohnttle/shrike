import React from 'react';
import { MuiThemeProvider, Box, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import { Footer } from './components/Footer';
import { HomePage } from './components/home/HomePage';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />

                <HomePage />

                <Footer />
            </MuiThemeProvider>
        );
    }
}

export { App };