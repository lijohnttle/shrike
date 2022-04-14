import { makeStyles } from '@mui/styles';
import colors from '../../../themes/colors.js';


const useStyles = makeStyles(theme => ({
    contentRoot: {
        justifyContent: 'center',
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(4)
        },
    },
    block: {
        marginTop: theme.spacing(4),
    },
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
    coreValuesList: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',

        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column nowrap%'
        },

        '& > div': {
            width: '50%',
            marginBottom: theme.spacing(2),

            [theme.breakpoints.down('sm')]: {
                width: '100%'
            },
        },

        '& > div:nth-child(even)': {
            paddingLeft: theme.spacing(0.5),

            [theme.breakpoints.down('sm')]: {
                paddingLeft: 0,
            },
        },

        '& > div:nth-child(odd)': {
            paddingRight: theme.spacing(0.5),

            [theme.breakpoints.down('sm')]: {
                paddingRight: 0,
            },
        },

        '& > div > div': {
            border: `2px solid ${colors.backgroundComplementary}`,
            padding: theme.spacing(2),
            height: '100%',
        },
    },
}));


export {
    useStyles
};
