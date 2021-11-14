import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    bookContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '98px',
        height: '160px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    bookLink: {
        display: 'block',
        overflow: 'hidden',

        '& img': {
            maxWidth: '100%',
            maxHeight: '100%'
        }
    }
}));


export {
    useStyles
};
