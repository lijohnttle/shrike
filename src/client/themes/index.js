import { createTheme, responsiveFontSizes } from '@mui/material/index.js';


let defaultTheme = createTheme({
    palette: {
        primary: {
            light: '#63a4ff',
            main: '#1976d2',
            dark: '#004ba0',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffd149',
            main: '#ffa000',
            dark: '#c67100',
            contrastText: '#000',
        },
        background: {
            default: '#ffffff',
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
    },
    overrides: {
        MuiSkeleton: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }
        }
    },
});

defaultTheme = responsiveFontSizes(defaultTheme);

export { defaultTheme };