import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    bottomToolBar: {
        alignSelf: 'end',
    },
    publishedOn: {
        marginBottom: theme.spacing(1),
    },
}));


export {
    useStyles
};
