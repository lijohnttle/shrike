import React, { useState } from 'react';
import { Drawer, isWidthUp, makeStyles, withWidth, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        color: ({ lightTheme }) =>  lightTheme ? 'black' : 'white',
        background: ({ transparent, lightTheme }) => transparent ? 'transparent' : lightTheme  ? 'white' : 'black',
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
        color: ({ lightTheme }) => lightTheme ? 'black' : 'inherit',
        background: ({ lightTheme }) => lightTheme ? 'white' : 'crimson',
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
        fontSize: '18px',
        textTransform: 'uppercase',

        '& li': {
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'stretch',
            background: 'transparent',

            '&:hover': {
                color: ({ lightTheme }) =>  lightTheme ? 'white' : 'black',
                background: ({ lightTheme }) => lightTheme ? 'black' : 'white',
            },
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
    },
    toggleMenuButtonContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'stretch',
        height: '100%',
        color: 'white',
    },
    drawer: {
        width: '240px',
        maxWidth: "75%",
    },
    drawerPaper: {
        width: '240px',
        maxWidth: "75%",
    },
    navigationVerticalMenu: ({ lightTheme }) => ({
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        listStyleType: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        width: '100%',
        padding: 0,
        margin: 0,
        fontSize: '18px',
        textTransform: 'uppercase',
        color: 'black',

        '& li': {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
            justifyContent: 'center',
            background: 'transparent',

            '&:hover': {
                background: 'silver',
            },
        },

        '& li a': {
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            textDecoration: 'none',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),

            '&:hover': {
                textDecoration: 'none',
            },
        },
    }),
    menuIcon: {
        color: ({ lightTheme }) => lightTheme ? 'black' : 'white'
    }
}));

const navigationLinks = [
    { title: 'about', href: '/about' }
];

const Header = ({ transparent, darkTheme, lightTheme, width }) => {
    const [isMenuOpen, setIsMenuopen] = useState(false);
    const classes = useStyles({ transparent, lightTheme: lightTheme });

    let navigationMenu;

    if (isWidthUp('sm', width)) {
        navigationMenu = (
            <ul className={classes.navigationMenu}>
                {navigationLinks.map((link) => <li key={link.href}><a href={link.href}>{link.title}</a></li>)}
            </ul>
        );
    }
    else {
        navigationMenu = (
            <div>
                <div className={classes.toggleMenuButtonContainer}>
                    <IconButton
                        onClick={() => {
                            setIsMenuopen(!isMenuOpen);
                        }}>
                        <MenuIcon className={classes.menuIcon} />
                    </IconButton>
                </div>

                <Drawer anchor="right" open={isMenuOpen} className={classes.drawer} classes={{ paper: classes.drawerPaper }} onClose={() => setIsMenuopen(false)}>
                    <ul className={classes.navigationVerticalMenu}>
                        {navigationLinks.map((link) => <li key={link.href}><a href={link.href}>{link.title}</a></li>)}
                    </ul>
                </Drawer>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <a className={classes.logo} href="/">
                    LIJOHNTTLE
                </a>

                <div>
                    {navigationMenu}
                </div>
            </div>
        </div>
    );
};

export default withWidth()(Header);