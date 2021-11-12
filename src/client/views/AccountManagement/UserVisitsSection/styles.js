import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        flexFlow: 'row wrap',
        marginBottom: theme.spacing(1),

        '& > button': {
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
    tableContainer: {
        height: '400px',
        width: '100%',
    },
}));


export { useStyles };
