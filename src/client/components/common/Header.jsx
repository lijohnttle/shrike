import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, isWidthUp, makeStyles, withWidth, IconButton, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        color: ({ light }) =>  light ? 'black' : 'white',
        background: ({ transparent, light }) => transparent ? 'transparent' : light  ? 'white' : 'black',
    },
    content: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        position: 'relative',
        height: '64px',

        [theme.breakpoints.down('sm')]: {
            height: '48px',
        },
    },
    logo: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: ({ light }) => light ? 'black' : 'inherit',
        background: ({ light }) => light ? 'white' : 'crimson',
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
                color: ({ light }) =>  light ? 'white' : 'black',
                background: ({ light }) => light ? 'black' : 'white',
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
    navigationVerticalMenu: ({ light }) => ({
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
        color: ({ light }) => light ? 'black' : 'white'
    }
}));

const navigationLinks = [
    { title: 'about', href: '/about' }
];

const Header = ({ transparent, darkTheme, light, width }) => {
    const [isMenuOpen, setIsMenuopen] = useState(false);
    const classes = useStyles({ transparent, light: light });

    let navigationMenu;

    if (isWidthUp('sm', width)) {
        navigationMenu = (
            <ul className={classes.navigationMenu}>
                {navigationLinks.map((link) => <li key={link.href}><Link to={link.href}>{link.title}</Link></li>)}
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
                        {navigationLinks.map((link) => <li key={link.href}><Link to={link.href}>{link.title}</Link></li>)}
                    </ul>
                </Drawer>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Container className={classes.content} maxWidth="lg">
                <Link className={classes.logo} to="/">
                    LIJOHNTTLE
                </Link>

                <div>
                    {navigationMenu}
                </div>
            </Container>
        </div>
    );
};

export default withWidth()(Header);