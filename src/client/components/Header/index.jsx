import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, IconButton, Container, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useUserSession } from '../../hooks';
import { signOut } from '../../services/security.js';
import { useStyles } from './styles';


const navigationLinks = [
    { title: 'blog', href: '/blog', action: undefined },
    { title: 'about', href: '/about', action: undefined },
];

const Header = ({ transparent, dark, light }) => {
    const [isMenuOpen, setIsMenuopen] = useState(false);
    const [getUserSession, _, removeUserSession] = useUserSession();
    const history = useNavigate();
    const classes = useStyles({ transparent, light: light });
    const smallScreenMatches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const signOutClickHandler = async (e) => {
        e?.preventDefault();

        try {
            const userSession = getUserSession();

            if (userSession) {
                await signOut(userSession.username, userSession.token);

                removeUserSession();

                history.push('/');
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    let menuItems = [...navigationLinks];

    if (getUserSession()) {
        menuItems.push({ title: 'Sign Out', href: '#', action: signOutClickHandler });
    }

    let navigationMenu = !smallScreenMatches
        ? (
            <ul className={classes.navigationMenu}>
                {menuItems.map((link) => <li key={link.title}><Link to={link.href} onClick={link.action}>{link.title}</Link></li>)}
            </ul>)
        : (
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
                        {menuItems.map((link) => <li key={link.href}><Link to={link.href} onClick={link.action}>{link.title}</Link></li>)}
                    </ul>
                </Drawer>
            </div>);

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <div className={classes.content}>
                    <Link className={classes.logo} to="/">
                        LIJOHNTTLE
                    </Link>

                    <div>
                        {navigationMenu}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export {
    Header
};
