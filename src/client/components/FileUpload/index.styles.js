import { styled } from '@mui/system';
import colors from '../../themes/colors';

export const FileUploadContainer = styled('div')(({
    position: 'relative',
    margin: '25px 0 15px',
    border: `4px dashed ${colors.formBorder}`,
    padding: '35px 20px',
    borderRadius: '7px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',

    '&:hover': {
        borderColor: colors.formBorderActive,
    },
}));

export const FormField = styled('input')(({
    fontSize: '18px',
    display: 'block',
    width: '100%',
    border: 'none',
    textTransform: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,

    '&:focus': {
        outline: 'none',
    },
}));

export const InputLabel = styled('label')(({ theme }) => ({
    color: colors.grayText,
    top: 0,
    left: 0,
    transform: 'translate(-4px, -60%) scale(0.75)',
    position: 'absolute',
    background: 'white',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

export const FilePreviewContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    border: `1px solid ${colors.formBorder}`,
    borderRadius: '7px',

    '&:hover': {
        borderColor: colors.formBorderActive,
    },

    'span': {
        fontSize: '14px',
    },
}));

export const PreviewList = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
    minHeight: '120px',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    }
}));

export const FileMetaData = styled('div', { shouldForwardProp: (prop) => !prop.startsWith('$') })(({
    display: `${(props) => (props.$isImageFile ? 'none' : 'flex')}`,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '10px',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(5, 5, 5, 0.55)',

    'aside': {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

export const PreviewContainer = styled('div')(({ theme }) => ({
    padding: '0.25rem',
    width: '20%',
    height: '120px',
    boxSizing: 'border-box',

    '&:hover': {
        opacity: '0.55',

        FileMetaData: {
            display: 'flex',
        },
    },

    '& > div:first-of-type': {
        height: '100%',
        position: 'relative',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '0 0 0.4em',
    },
}));
