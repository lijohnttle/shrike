import { makeStyles } from '@mui/styles';
import colors from '../../../themes/colors.js';


const useStyles = makeStyles(theme => ({
    root: {
        background: '#171717',
        color: colors.textComplementary,
    },
    contentRoot: ({ screenHeight }) => ({
        justifyContent: 'center',
        minHeight: `${screenHeight}px`,
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(4)
        },
    }),
    projectList: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',

        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column nowrap',
            justifyContent: 'flex-start',
        },
    },
    projectWrapper: {
        display: 'flex',
        flexFlow: 'column nowrap',
        paddingBottom: theme.spacing(1),
        width: '50%',

        '&:nth-child(odd)': {
            paddingRight: theme.spacing(0.5),

            [theme.breakpoints.down('md')]: {
                paddingRight: theme.spacing(0),
            },
        },

        '&:nth-child(even)': {
            paddingLeft: theme.spacing(0.5),

            [theme.breakpoints.down('md')]: {
                paddingLeft: theme.spacing(0),
            },
        },

        [theme.breakpoints.down('md')]: {
            width: '100%',
            paddingBottom: theme.spacing(1),
        },
    },
    project: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: '1',
        background: colors.backgroundComplementary,
        color: colors.textComplementary,
        border: '1px solid #666666',
    },
    projectContent: {
        display: 'flex',
        flexFlow: 'column nowrap',
        padding: theme.spacing(3),
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
    projectBottomPanel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));


export {
    useStyles
};
