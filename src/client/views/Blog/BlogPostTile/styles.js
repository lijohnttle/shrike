import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        background: 'white',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
}));


export {
    useStyles
};
