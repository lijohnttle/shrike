import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    root: ({screenHeight}) => ({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        background: 'url("/assets/images/welcome-background.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: `${screenHeight}px`
    }),
    childrenContainer: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        opacity: 0,
        animation: '$fadeInFromNone ease-in 1000ms forwards',
    },
    '@keyframes fadeInFromNone': {
        '0%': {
            opacity: 0,
        },
        '100%': {
            opacity: 1,
        }
    },
}));


export {
    useStyles
};
