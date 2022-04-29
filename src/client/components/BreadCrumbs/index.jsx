import React from 'react';
import { Container, Typography } from '@mui/material';
import { Box, Breakpoint } from '@mui/system';
import { InternalLink } from '../InternalLink';
import { pagesDescriptors } from '../../../static';
import { PageDescriptorModel } from '../../models';
import colors from '../../themes/colors';


/**
 * Returns a list of page descriptors with the current one in the end.
 * @param {PageDescriptorModel} currentPageDescriptor
 * @returns {PageDescriptorModel[]} 
 */
function getPageDescriptors(currentPageDescriptor) {
    if (!currentPageDescriptor) {
        return [];
    }

    const descriptors = [currentPageDescriptor];

    let descriptor = currentPageDescriptor;

    while (descriptor.parent) {
        descriptor = pagesDescriptors[descriptor.parent];
        descriptors.push(descriptor);
    }

    return descriptors.slice(1).reverse();
}

/**
 * Renders a bread crumb.
 * @param {Object} param0 
 * @param {PageDescriptorModel} param0.pageDescriptor 
 * @returns {React.ReactNode}
 */
const BreadCrumb = ({ pageDescriptor }) => {
    return (
        <Box display="flex" flexDirection="row" marginBottom={2}>
            <InternalLink
                to={pageDescriptor.path}
                sx={{
                    color: colors.grayText,
                    
                    '&:hover': {
                        color: colors.activeLight
                    },
                }}>
                {pageDescriptor.title.toUpperCase()}
            </InternalLink>

            <Typography sx={{ color: colors.grayText, fontSize: 'inherit' }} marginLeft={1} marginRight={1}>
                /
            </Typography>
        </Box>
    );
};

/**
 * 
 * @param {Object} props 
 * @param {PageDescriptorModel} props.pageDescriptor 
 * @param {Breakpoint} props.maxWidth 
 * @returns {React.ReactNode}
 */
const BreadCrumbs = (props) => {
    if (!props.pageDescriptor?.parent) {
        return null;
    }

    const pageDescriptors = getPageDescriptors(props.pageDescriptor);

    return (
        <Container maxWidth={props.maxWidth || 'lg'}>
            <Box display="flex" flexDirection="row" flexWrap="wrap" fontSize="0.75rem">
                {pageDescriptors.map(pageDescriptor => 
                    <BreadCrumb
                        key={pageDescriptor.name}
                        pageDescriptor={pageDescriptor} />)}
            </Box>
        </Container>
    );
};


export {
    BreadCrumbs,
};
