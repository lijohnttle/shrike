import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    root: ({ screenHeight }) => ({
        background: 'white',
        color: 'black',
        justifyContent: 'center',
        minHeight: `${screenHeight}px`,
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(4)
        }
    }),
    projectRoot: {
        display: 'flex',
        flexFlow: 'row nowrap',
        marginBottom: theme.spacing(0.5),
        background: '#f3f8ff',
    },
    projectBullet: {
        width: theme.spacing(1),
        background: '#cae2ff',
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
