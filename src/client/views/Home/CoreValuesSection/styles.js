import { makeStyles } from '@mui/styles';
import colors from '../../../themes/colors.js';


const useStyles = makeStyles(theme => ({
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
    coreValuesList: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',

        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column nowrap%'
        },

        '& > div': {
            width: '45%',
            marginBottom: theme.spacing(2),

            [theme.breakpoints.down('sm')]: {
                width: '100%'
            },
        },

        '& > div:nth-child(even)': {
            paddingLeft: theme.spacing(2),

            [theme.breakpoints.down('sm')]: {
                paddingLeft: 0,
            },
        },

        '& > div:nth-child(odd)': {
            paddingRight: theme.spacing(2),

            [theme.breakpoints.down('sm')]: {
                paddingRight: 0,
            },
        },

        '& > div > div': {
            background: '#2da7ff',
            color: colors.textComplementary,
            padding: theme.spacing(2),
            borderRadius: theme.spacing(2),
            height: '100%',
        },
    },
}));


export {
    useStyles
};
