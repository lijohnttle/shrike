import { makeStyles } from '@mui/styles';
import colors from '../../themes/colors.js';


const useStyles = makeStyles(() => ({
    buttonDarkTheme: {
        '&:hover': {
            background: '#59595996',
        }
    },
}));


export {
    useStyles
};
