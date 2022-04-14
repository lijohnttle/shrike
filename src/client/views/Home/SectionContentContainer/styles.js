import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    contentRoot: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        }
    },
    title: {
        paddingBottom: theme.spacing(6),
    },
    loader: {
        alignSelf: 'center',
    },
    space: {
        flex: '1 1 auto',
    },
}));


export {
    useStyles
};
