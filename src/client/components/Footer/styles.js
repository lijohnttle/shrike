import { makeStyles } from '@mui/styles';
import colors from '../../themes/colors.js';


const useStyles = makeStyles((theme) => ({
    root: {
        background: colors.backgroundComplementary,
        color: colors.textComplementary,
        marginTop: 'auto',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    content: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-around',

        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column nowrap',
        },
    },
    contactList: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
    },
}));


export {
    useStyles
};
