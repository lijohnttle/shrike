import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    sectionsRoot: {
        display: 'flex',
        flex: 'row no-wrap',
    },
    sectionRoot: {
        flexGrow: 1,
    },
}));


export { useStyles };
