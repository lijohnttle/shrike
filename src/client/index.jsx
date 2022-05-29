import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';

const rootElement = ReactDOM.createRoot(document.getElementById('app-root'));

rootElement.render(
    <CookiesProvider>
        <Router>
            <App />
        </Router>
    </CookiesProvider>    
);