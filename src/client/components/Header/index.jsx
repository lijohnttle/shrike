import React, { useEffect, useState } from 'react';
import { Drawer, IconButton, Container, useMediaQuery, useTheme, Tooltip } from '@mui/material';
import {
    Menu as MenuIcon,
    Book as BlogIcon,
    Info as InfoIcon,
    AccountCircle as AccountCircleIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import { useUserSession } from '../../hooks';
import { Box } from '@mui/system';
import colors from '../../themes/colors';
import { InternalLink } from '../';
import { pagesDescriptors } from '../../../static';


const navigationLinks = [
    {
        pageDescriptor: pagesDescriptors.ACCOUNT_MANAGEMENT,
        icon: () => <AccountCircleIcon />,
        title: 'Account',
        authenticated: true,
    },
    {
        pageDescriptor: pagesDescriptors.BLOG,
        icon: () => <BlogIcon />,
    },
    {
        pageDescriptor: pagesDescriptors.ABOUT,
        icon: () => <InfoIcon />,
        title: 'About Me',
    },
    {
        pageDescriptor: pagesDescriptors.SIGN_OUT,
        icon: () => <LogoutIcon />,
        authenticated: true,
        hideTitle: true,
    },
];

/**
 * Displays logo.
 */
function RenderLogo({ transparent }) {
    const theme = useTheme();

    return (
        <InternalLink
            to="/"
            sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                color: colors.textComplementary,
                background: transparent ? 'transparent' : colors.backgroundComplementaryContrast,
                textDecoration: 'none',
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                fontSize: '2rem',
                textTransform: 'capitalize',

                '&:hover': {
                    textDecoration: 'none',
                    background: colors.active,
                },
                
                [theme.breakpoints.down('sm')]: {
                    fontSize: '1.5rem',
                },
            }}>
            <Box
                sx={{
                    width: '32px',
                    height: '32px',
                    marginRight: 2,
                    background: 'url("/assets/images/Logo_32_Light.png")'
                }}/>
            LIJOHNTTLE
        </InternalLink>
    );
};

/**
 * Displays main menu.
 * @param {Object} param0 
 * @param {Boolean} param0.drawer
 */
function RenderNavigationMenu({ drawer }) {
    const [getUserSession] = useUserSession();
    const [menuItems, setMenuItems] = useState([]);
    const userSession = getUserSession();
    const theme = useTheme();

    useEffect(() => {
        setMenuItems(navigationLinks.filter(item => !item.authenticated || !!userSession));
    }, [userSession]);

    if (drawer) {
        return (
            <Box
                sx={{
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
                        justifyContent: 'left',
                        color: 'inherit',
                        textDecoration: 'none',
                        paddingLeft: theme.spacing(4),
                        paddingRight: theme.spacing(2),
                        paddingTop: theme.spacing(2),
                        paddingBottom: theme.spacing(2),
                
                        '&:hover': {
                            textDecoration: 'none',
                        },
                    },
                }}>
                <ul
                    style={{
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
                    }}>
                    {menuItems.map(item =>
                        <li key={item.pageDescriptor.name}>
                            <InternalLink to={item.pageDescriptor.path}>
                                {item.icon()}
                                <Box marginLeft={1}>
                                    {item.title || item.pageDescriptor.title}
                                </Box>
                            </InternalLink>
                        </li>)}
                </ul>
            </Box>
        );
    }
    else {
        return (
            <Box
                sx={{
                    height: '100%',
                    '& li': {
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        alignItems: 'stretch',
                        background: 'transparent',
                
                        '&:hover': {
                            color: colors.activeText,
                            background: colors.active,
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
                }}>
                <ul
                    style={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        alignItems: 'stretch',
                        listStyleType: 'none',
                        height: '100%',
                        padding: 0,
                        margin: 0,
                        fontSize: '18px',
                        textTransform: 'uppercase',
                    }}>
                    {menuItems.filter(item => !item.authenticated || !!userSession).map(item =>
                        <Tooltip key={item.pageDescriptor.name} title={item.title || item.pageDescriptor.title}>
                            <li>
                                <InternalLink to={item.pageDescriptor.path}>
                                    <Box display="flex" alignItems="center">
                                        {item.icon()}
                                        {!item.hideTitle
                                            ? (
                                                <Box marginLeft={1}>
                                                    {item.title || item.pageDescriptor.title}
                                                </Box>
                                            )
                                            : null}
                                    </Box>
                                </InternalLink>
                            </li>
                        </Tooltip>
                        
                        )}
                </ul>
            </Box>
        );
    }
}

/**
 * Displays burger menu.
 * @param {Object} param0 
 * @param {Boolean} param0.light Light theme. 
 * @returns 
 */
function RenderBurgerMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <Box
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                alignItems="stretch"
                height="100%">
                <IconButton
                    color="inherit"
                    sx={{
                        fontSize: '32px',
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
                    },
                }}
                onClose={() => setIsMenuOpen(false)}>
                <RenderNavigationMenu drawer />
            </Drawer>
        </div>
    );
}

export const Header = ({ transparent, dark, light }) => {
    const showBurgerMenu = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <Box
            color={light ? colors.text : colors.textComplementary}
            sx={{
                background: transparent ? 'transparent' : light  ? colors.background : colors.backgroundComplementaryContrast,
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

                    <RenderLogo transparent={transparent} />

                    <div>
                        {showBurgerMenu
                            ? <RenderBurgerMenu />
                            : <RenderNavigationMenu />}
                    </div>
                </Box>
            </Container>
        </Box>
    );
};
