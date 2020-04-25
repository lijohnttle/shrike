import React from 'react';
import { CvArticle } from './CvArticle';
import { ArticlePage } from '../common/article/ArticlePage';

const CvPage = () => (
    <ArticlePage background="white">
        <CvArticle />
    </ArticlePage>
);

export { CvPage };