import React from 'react';
import { ProjectsArticle } from './ProjectsArticle';
import { ArticlePage } from '../common/article/ArticlePage';

const ProjectsPage = () => {
    return (
        <ArticlePage background="#313131" color="white">
            <ProjectsArticle />
        </ArticlePage>
    );
}

export { ProjectsPage };