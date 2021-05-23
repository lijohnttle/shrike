import React from 'react';
import PropTypes from 'prop-types';
import { Link, Typography, Box, makeStyles, Button } from '@material-ui/core';
import { Facebook, LinkedIn, Email, Instagram, ArrowDownwardRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        color: theme.palette.primary.contrastText
    },
    contactsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(4),
        paddingTop: theme.spacing(2),
        borderTopColor: theme.palette.primary.contrastText,
        borderTopWidth: '1px',
        borderTopStyle: 'solid'
    }
}));

/**
 * Creates an icon element according to the vendor's name.
 * @param {String} vendor Vendor's name.
 * @returns {import('react').ReactElement} 
 */
function createIconByVendor(vendor) {
    switch (vendor) {
        case 'facebook':
            return <Facebook fontSize="inherit" />
        case 'instagram':
            return <Instagram fontSize="inherit" />
        case 'linkedin':
            return <LinkedIn fontSize="inherit" />
        case 'email':
            return <Email fontSize="inherit" />
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

const WelcomeSection = ({ contacts, gotoNextSection }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box flex="1 1 auto"></Box>

            <Box display="flex" flexDirection="column" justifyContent="center" flex="0 0 auto">
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
                        <Link
                            key={contact.vendor}
                            href={buildHRefByVendor(contact.vendor, contact.value)}
                            variant="h1"
                            color="inherit"
                            target="_blank">
                            {createIconByVendor(contact.vendor)}
                        </Link>))}
                </Box>
            </Box>

            <Box flex="1 1 auto" display="flex" justifyContent="center" alignItems="center">
                <Button variant="text" onClick={gotoNextSection} color="inherit">
                    <Typography variant="h1" align="center">
                        <ArrowDownwardRounded fontSize="inherit" />
                    </Typography>
                </Button>
            </Box>
        </div>
    );
};

WelcomeSection.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        vendor: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })),
    gotoNextSection: PropTypes.func.isRequired
};

export default WelcomeSection;