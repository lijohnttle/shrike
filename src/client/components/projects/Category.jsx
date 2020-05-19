import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Project } from './Project';
import { ProjectDetails } from './ProjectDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(6),
    },
    projectsList: {
        marginTop: theme.spacing(4),
    },
}));

const Category = ({ category, projects, selectedProject, onSelect, onResetSelection }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Typography variant="h2">
                {category}
            </Typography>

            <div className={classes.projectsList}>
                {renderProjects(projects, selectedProject, onSelect, onResetSelection)}
            </div>
        </div>
    );
};

function renderProjects(projects, selectedProject, onSelect, onResetSelection) {
    const uiData = projects.reduce((result, project, index) => {
        result.elements.push(
            <Project
                key={project.id}
                project={project}
                isSelected={selectedProject === project}
                onSelect={onSelect}
                onUnselect={onResetSelection} />
        );

        if (project === selectedProject) {
            result.selectedIndex = index;
            result.selectedProject = project;
        }

        if (index === result.selectedIndex) {
            result.elements.push(
                <ProjectDetails key={-1} project={result.selectedProject} />
            );
        }

        return result;
    }, { elements: [], selectedIndex: -1, selectedProject: null, selectionInserted: false });

    return uiData.elements;
}

export { Category };