import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    sectionsRoot: {
        display: 'flex',
        flexFlow: 'row nowrap',

        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column nowrap',
        },
    },
    sectionRoot: {
        flexGrow: 1,
    },
}));


export { useStyles };
