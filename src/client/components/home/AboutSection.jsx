import React from 'react';
import PropTypes from 'prop-types';
import { Container, Link, Typography, Box, makeStyles } from '@material-ui/core';
import { Facebook, LinkedIn, Email, Instagram } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url(\'/images/amsterdam.jpg\')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'transparent',
        paddingTop: theme.spacing(16),
        paddingBottom: theme.spacing(8),
        boxShadow: theme.shadows[3]
    },
    contactsContainer: {
        display: 'inline-block',
        marginTop: theme.spacing(4),
        paddingTop: theme.spacing(2),
        borderTopColor: theme.palette.text.primary,
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

const AboutSection = ({ contacts }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container>
                <Typography paragraph variant="h1" align="center">
                    Welcome!
                </Typography>
                <Typography paragraph variant="h2" align="center">
                    My name is Ivan Cherkasov
                </Typography>
                <Typography paragraph variant="h3" align="center">
                    I am a software engineer
                </Typography>

                <Typography paragraph variant="h1" align="center">
                    <Box className={classes.contactsContainer}>
                        {contacts.map(contact => (
                            <Link
                                key={contact.vendor}
                                href={buildHRefByVendor(contact.vendor, contact.value)}
                                color="textPrimary"
                                target="_blank">
                                {createIconByVendor(contact.vendor)}
                            </Link>))}
                    </Box>
                </Typography>
            </Container>
        </div>
    );
};

AboutSection.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        vendor: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }))
};

export { AboutSection };