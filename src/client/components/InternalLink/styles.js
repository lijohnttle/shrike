import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
    root: {

    },
    withoutUnderline: {
        '& a': {
            textDecoration: 'none',

            '&:hover': {
                textDecoration: 'none',
            },
        },
    },
}));


export {
    useStyles
};
