import React from 'react';
import { Box } from '@mui/system';
import { ArticleHeader } from './ArticleHeader';


export const Article = ({ title, subTitle, topGutter, maxWidth, children }) => {
    return (
        <Box display="flex" flexDirection="column" flexWrap="nowrap">
            <Box paddingTop={8} paddingBottom={4} zIndex={1}>
                <ArticleHeader title={title} subTitle={subTitle} maxWidth={maxWidth || 'lg'} />
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                flexGrow={1}
                paddingBottom={16}
                zIndex={0}>
                {children}
            </Box>
        </Box>
    );
};
