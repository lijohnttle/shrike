import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(4),
        minWidth: '200px',

        [theme.breakpoints.down('sm')]: {
            marginRight: 'unset',
            marginBottom: theme.spacing(4),
        },
    },
    list: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    },
}));


export {
    useStyles
};
