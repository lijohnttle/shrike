import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    fieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(2),
    },
    commandContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'end',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'stretch',
        },
    },
}));


export {
    useStyles
};
