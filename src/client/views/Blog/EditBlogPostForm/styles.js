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
    commandsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
    },
    commandContainer: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
}));


export {
    useStyles
};
