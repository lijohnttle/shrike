import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';

let defaultTheme = createMuiTheme({
    palette: {
        primary: deepOrange,
        secondary: red,
        text: {
            primary: '#e0e0e0',
            secondary: '#e0e0e0',
            hint: '#e0e0e0',
            disabled: '#808080'
        },
        background: {
            default: '#181818',
            paper: '#303030'
        }
    },
    typography: {
        h1: {
            fontSize: '4rem'
        },
        h2: {
            fontSize: '2.5rem'
        },
        h3: {
            fontSize: '1.6rem'
        },
        h4: {
            fontSize: '1.4rem'
        },
        h5: {
            fontSize: '1.2rem'
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 'bold'
        }
    }
});

defaultTheme = responsiveFontSizes(defaultTheme);

export { defaultTheme };