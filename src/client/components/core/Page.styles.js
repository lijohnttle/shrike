import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    pageContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
    }
}));


export {
    useStyles
}
