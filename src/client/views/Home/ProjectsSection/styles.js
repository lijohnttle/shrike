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
        flexFlow: 'column nowrap',
        marginBottom: theme.spacing(1),
        background: 'white',
        boxShadow: '3px 3px 7px #eaeaea',
        borderLeft: '4px solid black',
    },
    projectContent: {
        display: 'flex',
        flexFlow: 'column nowrap',
        padding: theme.spacing(2),
    },
    projectTopPanel: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    projectTitle: {
        marginRight: theme.spacing(2),
    },
    projectLinks: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: theme.spacing(2),
        paddingTop: '0',
    },
}));


export {
    useStyles
};
