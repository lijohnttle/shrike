import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        background: 'white',
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        marginBottom: theme.spacing(4),
        boxShadow: '3px 3px 7px #00000017',

        [theme.breakpoints.down('sm')]: {
            
        },
    },
}));


export {
    useStyles
};
