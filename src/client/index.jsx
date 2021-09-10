import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <CookiesProvider>
        <Router>
            <App />
        </Router>
    </CookiesProvider>,
    document.getElementById('app-root')
);