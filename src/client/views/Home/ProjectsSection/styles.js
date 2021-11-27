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
        marginBottom: theme.spacing(2),
    },
    projectTitle: {
        marginRight: theme.spacing(2),
    },
    projectDefaultStatus: {
        color: '#d1d1d1',
        fontSize: '0.75rem',
        padding: '0px 4px',
        border: '1px solid #d1d1d1',
        borderRadius: '3px',
    },
    projectLiveStatus: {
        color: '#60cb3d',
        border: '1px solid #60cb3d',
    },
    projectTechnologyList: {
        display: 'flex',
        flexFlow: 'row wrap',
    },
    projectTechnology: {
        background: '#7bb6ff',
        color: 'white',
        fontSize: '0.75rem',
        padding: '0px 4px',
        marginRight: '4px',
        marginBottom: '2px',
        borderRadius: '3px',
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
