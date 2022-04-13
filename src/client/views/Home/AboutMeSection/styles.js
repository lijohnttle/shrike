import { makeStyles } from '@mui/styles';
import colors from '../../../themes/colors.js';


const useStyles = makeStyles(theme => ({
    root: {
        background: '#1c1253',
        color: colors.textComplementary,
    }, 
    contentRoot: ({ screenHeight }) => ({
        justifyContent: 'center',
        minHeight: `${screenHeight}px`,
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(4)
        },
    }),
    split: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'start',

        [theme.breakpoints.down('md')]: {
            flexFlow: 'column nowrap',
        },
    },
    leftColumn: {
        display: 'flex',
        flexFlow: 'column nowrap',
        maxWidth: '400px',
        fontSize: '1.2rem',
    },
    summaryContainer: {
        background: colors.background,
        color: colors.text,
        boxShadow: `14px 14px 0px 0px #00adff`,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        marginTop: theme.spacing(4),

        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    picture: {
        width: '50%',
        marginLeft: theme.spacing(4),
        alignSelf: 'stretch',
        background: 'url(\'/assets/images/development.png\')',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',

        [theme.breakpoints.down('md')]: {
            display: 'none',
            marginLeft: 0,
            width: '100%',
            marginTop: theme.spacing(4),
        },
    },
    readMoreButton: {
        marginTop: theme.spacing(8),
        alignSelf: 'end',

        '& a': {
            fontSize: '1.2rem',
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
    },
}));


export {
    useStyles
};
