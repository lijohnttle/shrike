import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, IconButton, Container, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useUserSession } from '../../hooks';
import { signOut } from '../../services/securityService';
import { Box, styled } from '@mui/system';
import colors from '../../themes/colors';


const navigationLinks = [
    { title: 'blog', href: '/blog', action: undefined },
    { title: 'about', href: '/about', action: undefined },
];

const Logo = styled(Link)(({ theme, light }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.text,
    background: colors.background,
    textDecoration: 'none',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: '2rem',
    textTransform: 'capitalize',

    '&:hover': {
        textDecoration: 'none',
    },
    
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

const NavigationMenu = styled('ul')(({ theme, light }) => ({
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
            color: light ? 'white' : 'black',
            background: light ? 'black' : 'white',
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
}));

const NavigationVerticalMenu = styled('ul')(({ theme, light }) => ({
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
}));

export const Header = ({ transparent, dark, light }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [getUserSession, _, removeUserSession] = useUserSession();
    const navigate = useNavigate();
    const smallScreenMatches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const signOutClickHandler = async (e) => {
        e?.preventDefault();

        try {
            const userSession = getUserSession();

            if (userSession) {
                await signOut(userSession.username, userSession.token);

                removeUserSession();

                navigate('/');
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
            <NavigationMenu light={light ? 1 : 0}>
                {menuItems.map((link) => <li key={link.title}><Link to={link.href} onClick={link.action}>{link.title}</Link></li>)}
            </NavigationMenu>)
        : (
            <div>
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="nowrap"
                    alignItems="stretch"
                    height="100%"
                    color={light ? colors.text : colors.textComplementary}>
                    <IconButton
                        color="inherit"
                        sx={{
                            fontSize: '40px',
                        }}
                        onClick={() => {
                            setIsMenuOpen(!isMenuOpen);
                        }}>
                        <MenuIcon fontSize="inherit" />
                    </IconButton>
                </Box>

                <Drawer
                    anchor="right"
                    open={isMenuOpen}
                    PaperProps={{
                        sx: {
                            width: '75%',
                            maxWidth: "75%"
                        }
                    }}
                    onClose={() => setIsMenuOpen(false)}>
                    <NavigationVerticalMenu light={light ? 1 : 0}>
                        {menuItems.map((link) => <li key={link.href}><Link to={link.href} onClick={link.action}>{link.title}</Link></li>)}
                    </NavigationVerticalMenu>
                </Drawer>
            </div>);

    return (
        <Box
            color={light ? colors.text : colors.textComplementary}
            sx={{
                background: transparent ? 'transparent' : light  ? 'white' : 'black'
            }}>
            <Container maxWidth="lg">
                <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="nowrap"
                    justifyContent="space-between"
                    alignItems="stretch"
                    position="relative"
                    sx={{
                        height: {
                            xs: '48px',
                            sm: '64px',
                        }
                    }}>
                    <Logo to="/" light={light ? 1 : 0}>
                        LIJOHNTTLE
                    </Logo>

                    <div>
                        {navigationMenu}
                    </div>
                </Box>
            </Container>
        </Box>
    );
};
