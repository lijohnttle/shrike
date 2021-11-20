import React from 'react';
import { Facebook, LinkedIn, Email, Instagram, GitHub, Link as LinkIcon, Web } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import { useStyles } from './styles';


/**
 * Creates an icon element according to the vendor's name.
 * @param {String} vendor Vendor's name.
 * @returns {import('react').ReactElement} 
 */
 function createIconByVendor(vendor, fontSize, className) {
    switch (vendor) {
        case 'facebook':
            return <Facebook fontSize={fontSize} className={className} classes={{ root: className }} />
        case 'instagram':
            return <Instagram fontSize={fontSize} className={className} />
        case 'linkedin':
            return <LinkedIn fontSize={fontSize} className={className} />
        case 'github':
            return <GitHub fontSize={fontSize} className={className} />
        case 'web':
            return <Web fontSize={fontSize} className={className} />
        case 'email':
            return <Email fontSize={fontSize} className={className} />
        default:
            return <LinkIcon fontSize={fontSize} className={className} />;
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

const ContactLink = ({ contact, dark, fontSize, iconClassName }) => {
    const classes = useStyles();

    return (
        <div>
            <IconButton
                className={dark ? classes.buttonDarkTheme : ''}
                href={buildHRefByVendor(contact.vendor, contact.value)}
                color="inherit"
                target="_blank">
                {createIconByVendor(contact.vendor, fontSize || 'inherit', iconClassName)}
            </IconButton>
        </div>
    );
};


export {
    ContactLink
};
