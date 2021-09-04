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
    },
    navigationMenu: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'stretch',
        listStyleType: 'none',
        height: '100%',
        padding: 0,
        margin: 0,
        fontSize: '24px',
        textTransform: 'capitalize',

        '& li': {
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'stretch',
        },

        '& li a': {
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            textDecoration: 'none',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),

            '&:hover': {
                textDecoration: 'none',
            },
        },

        '&:hover': {
            color: 'black',
            background: 'white',
        },

        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
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

                <div>
                    <ul className={classes.navigationMenu}>
                        <li>
                            <a href="/about">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;