import { makeStyles } from '@mui/styles';
import colors from '../../themes/colors.js';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: '1',
    },
    header: {
        background: colors.background,
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
        zIndex: 1,
    },
    childrenContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        paddingBottom: theme.spacing(16),
        zIndex: 0,
    },
    topGutter: {
        paddingTop: theme.spacing(4),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(2),
        },
    },
}));


export {
    useStyles
};
