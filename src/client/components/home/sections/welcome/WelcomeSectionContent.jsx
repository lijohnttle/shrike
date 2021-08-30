import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, makeStyles, Button, IconButton } from '@material-ui/core';
import { Facebook, LinkedIn, Email, Instagram, ArrowDownwardRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#000000af',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        color: theme.palette.primary.contrastText
    },
    messageContainer: {
        paddingTop: theme.spacing(8),
        paddingRight: theme.spacing(16),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: '0 0 auto',
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(8),
            paddingLeft: theme.spacing(8),
        },
        [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
        }
    },
    contactsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(6),
    },
    contactIcon: {
        width: theme.typography.h1.fontSize,
        height: theme.typography.h1.fontSize,
        [theme.breakpoints.down('sm')]: {
            width: theme.typography.h2.fontSize,
            width: theme.typography.h2.fontSize,
        }
    },
    iconButton: {
        '&:hover': {
            background: '#59595996',
        }
    },
    gotoNextSectionButtonContainer: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gotoNextSectionIcon: {
        width: theme.typography.h1.fontSize,
        height: theme.typography.h1.fontSize,
        [theme.breakpoints.down('sm')]: {
            width: theme.typography.h2.fontSize,
            width: theme.typography.h2.fontSize,
        }
    },
}));

/**
 * Creates an icon element according to the vendor's name.
 * @param {String} vendor Vendor's name.
 * @returns {import('react').ReactElement} 
 */
function createIconByVendor(vendor, className) {
    switch (vendor) {
        case 'facebook':
            return <Facebook fontSize="inherit" className={className} />
        case 'instagram':
            return <Instagram fontSize="inherit" className={className} />
        case 'linkedin':
            return <LinkedIn fontSize="inherit" className={className} />
        case 'email':
            return <Email fontSize="inherit" className={className} />
        default:
            return null;
    }
}

/**
 * Builds a final link according to vendor's name.
 * @param {String} vendor Vendor's name.
 * @param {String} value Original link.
 */
function buildHRefByVendor(vendor, value) {
    switch (vendor) {
        case 'email':
            return `mailto:${value}`;
        default:
            return value;
    }
}

const WelcomeSectionContent = ({ contacts, gotoNextSection }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box flex="1 1 auto"></Box>

            <div className={classes.messageContainer}>
                <Typography paragraph variant="h1" align="center">
                    Welcome!
                </Typography>
                <Typography paragraph variant="h2" align="center">
                    My name is Ivan Cherkasov
                </Typography>
                <Typography paragraph variant="h3" align="center">
                    I am a Software Engineer
                </Typography>

                <Box className={classes.contactsContainer}>
                    {contacts.map(contact => (
                        <IconButton
                            key={contact.vendor}
                            className={classes.iconButton}
                            href={buildHRefByVendor(contact.vendor, contact.value)}
                            color="inherit"
                            target="_blank">
                            {createIconByVendor(contact.vendor, classes.contactIcon)}
                        </IconButton>
                    ))}
                </Box>
            </div>

            <div className={classes.gotoNextSectionButtonContainer}>
                <IconButton className={classes.iconButton} onClick={gotoNextSection} color="inherit">
                    <ArrowDownwardRounded className={classes.gotoNextSectionIcon} />
                </IconButton>
            </div>
        </div>
    );
};

WelcomeSectionContent.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        vendor: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })),
    gotoNextSection: PropTypes.func.isRequired
};

export default WelcomeSectionContent;