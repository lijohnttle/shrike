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
    projectTopPanel: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    projectDefaultStatus: {
        color: '#d1d1d1',
        fontSize: '0.75rem',
        marginLeft: theme.spacing(2),
        padding: '0px 4px',
        border: '1px solid #d1d1d1',
        borderRadius: '3px',
    },
    projectLiveStatus: {
        color: '#b7e789',
        border: '1px solid #b7e789',
    },
    projectContentRoot: {
        flexGrow: 1,
        padding: theme.spacing(2),
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
