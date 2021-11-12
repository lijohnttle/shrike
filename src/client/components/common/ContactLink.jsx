import React from 'react';
import { Facebook, LinkedIn, Email, Instagram } from '@mui/icons-material'
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    buttonDarkTheme: {
        '&:hover': {
            background: '#59595996',
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

const ContactLink = ({ contact, dark, iconClassName }) => {
    const classes = useStyles();

    return (
        <div>
            <IconButton
                className={dark ? classes.buttonDarkTheme : ''}
                href={buildHRefByVendor(contact.vendor, contact.value)}
                color="inherit"
                target="_blank">
                {createIconByVendor(contact.vendor, iconClassName)}
            </IconButton>
        </div>
    );
};

export default ContactLink;