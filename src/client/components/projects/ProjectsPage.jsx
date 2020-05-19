import React from 'react';
import { ProjectsArticle } from './ProjectsArticle';
import { ArticlePage } from '../common/article/ArticlePage';
import Colors from './Colors';

const ProjectsPage = () => {
    return (
        <ArticlePage background={Colors.background} color={Colors.color}>
            <ProjectsArticle />
        </ArticlePage>
    );
}

export { ProjectsPage };