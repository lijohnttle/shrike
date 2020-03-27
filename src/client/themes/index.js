import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';

let defaultTheme = createMuiTheme({
    palette: {
        primary: deepOrange,
        secondary: red,
        background: {
            default: '#f0f0f0',
            paper: '#ffffff'
        }
    },
    typography: {
        fontFamily: [ 'Roboto', 'Arial Narrow', 'Arial', 'Helvetica' ],
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