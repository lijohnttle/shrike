import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    contentRoot: {
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
        paddingBottom: theme.spacing(4),
    },
    loader: {
        alignSelf: 'center',
    },
    topSpace: {
        flex: '1 1 auto',
    },
    bottomSpace: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gotoNextSectionButtonContainer: {
        marginTop: theme.spacing(2),
    },
}));


export {
    useStyles
};
