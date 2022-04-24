import { createTheme, responsiveFontSizes } from '@mui/material/index.js';
import colors from './colors.js';


let defaultTheme = createTheme({
    palette: {
        primary: {
            light: colors.activeLight,
            main: colors.active,
            dark: colors.activeDark,
            contrastText: colors.activeText,
        },
        secondary: {
            light: '#ffd149',
            main: '#ffa000',
            dark: '#c67100',
            contrastText: colors.text,
        },
        background: {
            default: colors.background,
            paper: colors.paperBackground,
        },
        brand: {
            main: colors.brand,
            contrastText: colors.activeText,
        },
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
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }, 
            },
        },
    },
    overrides: {
        MuiSkeleton: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }
        },
    },
});

defaultTheme = responsiveFontSizes(defaultTheme);

export { defaultTheme };