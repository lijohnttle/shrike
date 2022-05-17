import { createTheme, responsiveFontSizes } from '@mui/material/index.js';
import themeColors from './colors.js';


export const colors = themeColors;

export const defaultTheme = responsiveFontSizes(createTheme({
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
            light: colors.brandLight,
            main: colors.brand,
            dark: colors.brandDark,
            contrastText: colors.activeText,
        },
        complementary: {
            main: colors.backgroundComplementary,
            mani: colors.textComplementary,
        },
        text: {
            main: colors.text,
        },
    },
    typography: {
        fontFamily: ['sans-serif', 'Arial', 'Arial Narrow', 'Helvetica', 'Roboto' ],
        h1: {
            fontSize: '3rem'
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
        },
        body1: {
            color: colors.text,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: 'none',

                    '&:hover': {
                        boxShadow: 'none',
                    },
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
}));
