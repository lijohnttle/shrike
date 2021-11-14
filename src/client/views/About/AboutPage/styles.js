import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    introductionBlock: {
        background: 'lightslategray',
        color: 'white',
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
    contactIcon: {
        width: 48,
        height: 48,
    },
}));


export {
    useStyles
};
