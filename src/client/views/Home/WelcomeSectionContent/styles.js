import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#000000af',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        color: theme.palette.primary.contrastText
    },
    headerContainer: {
        flex: '1 1 auto',
        alignSelf: 'stretch',
    },
    messageContainer: {
        paddingTop: theme.spacing(8),
        paddingRight: theme.spacing(16),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: '0 0 auto',
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(8),
            paddingLeft: theme.spacing(8),
        },
        [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
        }
    },
    contactsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(6),
    },
    buttonDarkTheme: {
        '&:hover': {
            background: '#59595996',
        }
    },
    gotoNextSectionButtonContainer: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gotoNextSectionIcon: {
        width: theme.typography.h1.fontSize,
        height: theme.typography.h1.fontSize,

        [theme.breakpoints.down('sm')]: {
            width: theme.typography.h2.fontSize,
            width: theme.typography.h2.fontSize,
        }
    },
}));


export {
    useStyles
};
