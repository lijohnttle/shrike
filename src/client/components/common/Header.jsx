import React, { useState } from 'react';
import { Drawer, isWidthUp, makeStyles, withWidth } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';
import MenuIcon from '@material-ui/icons/Menu';

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
        textTransform: 'uppercase',

        '& li': {
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'stretch',
            background: 'transparent',

            '&:hover': {
                color: 'black',
                background: 'white',
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

        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
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
    navigationVerticalMenu: {
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
        fontSize: '24px',
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
    },
}));

const navigationLinks = [
    { title: 'about', href: '/about' }
];

const Header = ({ transparent, width }) => {
    const [isMenuOpen, setIsMenuopen] = useState(false);
    const classes = useStyles({ transparent, width });

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
                    <ToggleButton
                        value="check"
                        selected={isMenuOpen}
                        onChange={() => {
                            setIsMenuopen(!isMenuOpen);
                        }}>
                        <MenuIcon style={{ color: "white" }}/>
                    </ToggleButton>
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