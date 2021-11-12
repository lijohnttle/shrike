import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    listItem: {
        background: ({ isSelected }) => !isSelected ? '#f0f0f0' : theme.palette.primary.main,
        color: ({ isSelected }) => !isSelected ? 'inherit' : theme.palette.primary.contrastText,
        margin: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        cursor: 'pointer',

        '&:hover': {
            background: ({ isSelected }) => !isSelected ? theme.palette.primary.light : theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    },
}));


export { useStyles };
