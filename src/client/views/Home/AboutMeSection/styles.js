import { makeStyles } from '@mui/styles';
import colors from '../../../themes/colors.js';


const useStyles = makeStyles(theme => ({
    root: {
        background: '#191919',
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
    rightColumn: {
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '50%',
        alignSelf: 'stretch',
        marginLeft: theme.spacing(4),
        background: colors.background,
        color: colors.text,
        boxShadow: `14px 14px 0px 0px #00adff`,

        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: 0,
            marginTop: theme.spacing(8),
            background: 'none',
            color: colors.textComplementary,
            boxShadow: 'none',
        },
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
    pictureContainer: {
        flexGrow: '1',
        padding: theme.spacing(4),

        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    picture: {
        width: '100%',
        height: '100%',
        background: 'url(\'/assets/images/development.png\')',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
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
    contactList: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
}));


export {
    useStyles
};
