import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: '1',
    },
    header: {
        background: 'white',
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
        zIndex: 1,
    },
    childrenContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        paddingBottom: theme.spacing(16),
        zIndex: 0,
    },
    hollow: {
        background: '#f7f7f7',
        boxShadow: 'inset 0px 7px 7px -7px #00000017',
    },
}));


export {
    useStyles
};
