import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: theme.spacing(4),
        minWidth: '200px',
    },
    list: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    },
}));


export { useStyles };
