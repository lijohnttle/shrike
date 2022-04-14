import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    root: ({ screenHeight }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        minHeight: `${screenHeight}px`,
    }),
    childrenContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        flex: '1',
    },
    bottomSpace: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gotoNextSectionButtonContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    gotoNextSectionButton: {
        '&:hover': {
            background: '#99999940 !important',
        },
        
        '&.dark:hover': {
            background: '#ffffff33 !important',
        },
    },
}));


export {
    useStyles
};
