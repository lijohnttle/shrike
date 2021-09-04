import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
        background: ({ transparent }) => transparent ? 'transparent' : '#000',
    },
    content: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'relative',
        height: '64px',
        width: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',

        [theme.breakpoints.down('sm')]: {
            height: '48px',
            width: 'unset',
            marginLeft: '0',
            marginRight: '0',
        },
    },
    logo: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'inherit',
        background: 'crimson',
        textDecoration: 'none',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontSize: '32px',
        textTransform: 'capitalize',

        '&:hover': {
            textDecoration: 'none',
        },
        
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px',
        },
    }
}));

const Header = ({ transparent }) => {
    const classes = useStyles({ transparent });

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <a className={classes.logo} href="/">
                    LIJOHNTTLE
                </a>
            </div>
        </div>
    );
};

export default Header;