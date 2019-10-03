import React from 'react';
import { MuiThemeProvider, Box } from '@material-ui/core';
import theme from './theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BooksSection } from './components/home/BooksSection';
import data from './data';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Box mb={4}>
                    <Header />
                </Box>

                <BooksSection userId={data.goodReads.userId} />

                <Footer />
            </MuiThemeProvider>
        );
    }
}

export { App };