import React from 'react';
import { Box, SxProps, Breakpoint } from '@mui/system';
import { ArticleHeader } from './ArticleHeader';
import { PageDescriptorModel } from '../../models';
import { BreadCrumbs } from '../BreadCrumbs';


/**
 * An article.
 * @param {Object} props 
 * @param {PageDescriptorModel} props.pageDescriptor 
 * @param {String} props.title 
 * @param {any} props.subTitle 
 * @param {SxProps} props.titleStyles
 * @param {Breakpoint} props.titleMaxWidth
 * @param {React.ReactNode} props.children
 * @returns {React.ReactNode}
 */
export function Article(props) {
    return (
        <Box display="flex" flexDirection="column" flexWrap="nowrap">
            <Box paddingTop={8} zIndex={1}>
                {props.pageDescriptor
                    ? <BreadCrumbs pageDescriptor={props.pageDescriptor} maxWidth={props.titleMaxWidth} />
                    : null}

                <ArticleHeader
                    title={props.title || props.pageDescriptor?.title?.toUpperCase() || ''}
                    subTitle={props.subTitle}
                    titleStyles={props.titleStyles}
                    maxWidth={props.titleMaxWidth} />
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                flexGrow={1}
                paddingBottom={16}
                zIndex={0}>
                {props.children}
            </Box>
        </Box>
    );
};
