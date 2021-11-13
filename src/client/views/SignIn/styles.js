import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '300px',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

        [theme.breakpoints.down('xs')]: {
            alignSelf: 'stretch',
            width: 'unset',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    },
    topSpace: {
        flexGrow: 1,
    },
    bottomSpace: {
        flexGrow: 2,
    }
}));


export {
    useStyles
};
