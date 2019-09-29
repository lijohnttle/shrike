import React from 'react';
import { Container, MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import { Header } from './components/Header';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Container>
                    <Header />
                </Container>
            </MuiThemeProvider>
        );
    }
}

export { App };