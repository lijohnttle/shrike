import React from 'react';
import { MuiThemeProvider, Box, CssBaseline } from '@material-ui/core';
import { defaultTheme } from './themes';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BooksSection } from './components/home/BooksSection';
import data from './data';
import { AboutSection } from './components/home/AboutSection';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={defaultTheme}>
                <CssBaseline />

                <Header />

                <Box mt={16} mb={8}>
                    <AboutSection contacts={data.contacts} />
                </Box>

                <Box mb={8}>
                    <BooksSection userId={data.goodReads.userId} />
                </Box>

                <Footer />
            </MuiThemeProvider>
        );
    }
}

export { App };