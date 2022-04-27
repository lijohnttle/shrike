import { Container } from '@mui/material';
import { Box, Breakpoint } from '@mui/system';
import React from 'react';
import { pagesDescriptors } from '../../../static';
import { PageDescriptorModel } from '../../models';


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

    return descriptors.reverse();
}

/**
 * 
 * @param {Object} props 
 * @param {PageDescriptorModel} props.pageDescriptor 
 * @param {Breakpoint} props.maxWidth 
 * @returns {React.ReactNode}
 */
const BreadCrumbs = (props) => {
    const pageDescriptors = getPageDescriptors(props.pageDescriptor);

    return (
        <Container maxWidth={props.maxWidth || 'lg'}>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                Bread Crumbs
            </Box>
        </Container>
    );
};


export {
    BreadCrumbs,
};
