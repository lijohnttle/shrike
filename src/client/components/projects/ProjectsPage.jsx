import React from 'react';
import { ProjectsPageSection } from './ProjectsPageSection';
import { ArticlePage } from '../common/article/ArticlePage';

const ProjectsPage = () => {
    return (
        <ArticlePage background="#313131" color="white">
            <ProjectsPageSection />
        </ArticlePage>
    );
}

export { ProjectsPage };