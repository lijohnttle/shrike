import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    root: {
        background: '#fafafa',
        color: 'black',
    },
    contentRoot: ({ screenHeight }) => ({
        justifyContent: 'center',
        minHeight: `${screenHeight}px`,
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(4)
        }
    }),
    projectRoot: {
        display: 'flex',
        flexFlow: 'row nowrap',
        marginBottom: theme.spacing(1),
        background: 'white',
    },
    projectBullet: {
        width: theme.spacing(1),
        background: '#5e6f85',
    },
    projectContentRoot: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    projectLinks: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'end',
        
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
            justifyContent: 'start',
        },
    },
}));


export {
    useStyles
};
