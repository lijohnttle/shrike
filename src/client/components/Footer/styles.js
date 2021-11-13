import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        background: '#313131',
        color: 'white',
        marginTop: 'auto',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    content: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-around',

        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column nowrap',
        },
    },
    contactList: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
    },
}));


export {
    useStyles
};
