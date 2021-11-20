import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    root: ({ screenHeight }) => ({
        background: 'white',
        color: 'black',
        justifyContent: 'center',
        minHeight: `${screenHeight}px`,
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(4)
        }
    }),
}));


export {
    useStyles
};
