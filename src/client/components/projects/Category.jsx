import React from 'react';
import { makeStyles, Typography, withWidth, isWidthUp } from '@material-ui/core';
import { Project } from './Project';
import { ProjectDetails } from './ProjectDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(6),
    },
    projectList: {
        display: 'flex',
        flexFlow: 'column nowrap',

        [theme.breakpoints.up('lg')]: {
            flexFlow: 'row wrap'
        }
    }
}));

const Category = ({ category, projects, selectedProject, onSelect, onResetSelection, width }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Typography variant="h2">
                {category}
            </Typography>

            <div className={classes.projectList}>
                {renderProjects(projects, selectedProject, onSelect, onResetSelection, width)}
            </div>
        </div>
    );
};

function determineIfProjectIsLastInRowWithSelectedOne(currentIndex, selectedIndex, count, width) {
    let lastInARow = false;

    if (selectedIndex >= 0) {
        if (!isWidthUp('lg', width)) {
            // if all items in one column then insert selection element after selected project
            lastInARow = currentIndex === selectedIndex;
        }
        else {
            const isLastItem = selectedIndex === count - 1;

            if (isLastItem) {
                return true;
            }

            // when projects are in two columns
            const projectInTheSecondColumn = currentIndex % 2 === 1;

            if (isLastItem || projectInTheSecondColumn) {
                // if project is the last one in a row with selected one then insert selection element
                lastInARow = currentIndex === selectedIndex || currentIndex === selectedIndex + 1;
            }
        }
    }

    return lastInARow;
}

function renderProjects(projects, selectedProject, onSelect, onResetSelection, width) {
    const uiData = projects.reduce((result, project, index) => {
        result.elements.push(
            <Project
                key={project.id}
                project={project}
                even={!result.selectionInserted ? index % 2 === 0 : (index + 1 % 2 === 0)}
                isSelected={selectedProject === project}
                onSelect={onSelect}
                onUnselect={onResetSelection} />
        );

        if (project === selectedProject) {
            result.selectedIndex = index;
            result.selectedProject = project;
        }

        if (determineIfProjectIsLastInRowWithSelectedOne(index, result.selectedIndex, projects.length, width)) {
            result.elements.push(
                <ProjectDetails key={-1} project={result.selectedProject} onClose={onResetSelection} />
            );
        }

        return result;
    }, { elements: [], selectedIndex: -1, selectedProject: null, selectionInserted: false });

    return uiData.elements;
}

const CategoryExport = withWidth()(Category);

export { CategoryExport as Category };