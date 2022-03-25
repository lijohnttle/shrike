import { makeStyles } from '@mui/styles';
import colors from '../../../themes/colors.js';


const useStyles = makeStyles((theme) => ({
    introductionBlock: {
        background: colors.backgroundComplementary,
        color: colors.textComplementary,
    },
    pictureContainer: {
        width: '50%',
        float: 'right',
        paddingLeft: theme.spacing(4),

        [theme.breakpoints.down('sm')]: {
            float: 'none',
            paddingLeft: 0,
            width: '100%',
            paddingBottom: theme.spacing(2),
        },
    },
    picture: {
        width: '100%',
    },
    contactList: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
    },
}));


export {
    useStyles
};
