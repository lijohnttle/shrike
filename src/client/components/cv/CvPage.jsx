import React from 'react';
import { CvPageSection } from './CvPageSection';
import { ArticlePage } from '../common/article/ArticlePage';

const CvPage = () => {
    return (
        <ArticlePage background="white">
            <CvPageSection />
        </ArticlePage>
    );
}

export { CvPage };