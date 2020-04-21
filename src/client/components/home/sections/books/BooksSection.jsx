import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { GoodReadsBookListWidget } from '../../../widgets/GoodReadsBookListWidget';
import { Article } from '../../../common/article/Article';
import { ArticleTitle } from '../../../common/article/ArticleTitle';

const BooksSection = ({ userId }) => {
    return (
        <Article>
            <ArticleTitle title="Book Library" />

            <Box mb={4} mt={2}>
                <GoodReadsBookListWidget title="Currently Reading" userId={userId} shelf="currently-reading" count={20} />
            </Box>
            <Box mb={4}>
                <GoodReadsBookListWidget title="Recently Read" shelf="read" userId={userId} count={10} />
            </Box>
        </Article>
    );
};

export { BooksSection };