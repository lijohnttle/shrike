import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    commandsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
    },
    commandContainer: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));


export {
    useStyles
};
