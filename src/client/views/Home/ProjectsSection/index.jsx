import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ContactLink } from '../../../components/ContactLink';
import { SectionContentContainer } from '../SectionContentContainer';
import { useStyles } from './styles';


const projectStatuses = {
    RELEASED: 'released',
    DEVELOPMENT: 'development',
    DESIGN: 'design',
};

const projects = [
    {
        name: 'Habit Tracker',
        description: 'Mobile application for tracking habits.',
        technologies: ['JavaScript', 'React Native'],
        links: [
            {
                vendor: 'github',
                value: 'https://github.com/lijohnttle/habit-tracker',
            },
        ],
        status: projectStatuses.DESIGN,
    },
    {
        name: 'Monsterlution',
        description: 'A blockchain game.',
        technologies: ['C#', 'Unity 3D'],
        links: [
            {
                vendor: 'github',
                value: 'https://github.com/lijohnttle/monsterlution',
            },
        ],
        status: projectStatuses.DESIGN,
    },
    {
        name: 'Personal Web-Site',
        description: 'My personal web-site.',
        technologies: ['JavaScript', 'React', 'Node.JS', 'Express', 'GraphQL', 'MongoDB'],
        links: [
            {
                vendor: 'github',
                value: 'https://github.com/lijohnttle/personal-website',
            },
            {
                vendor: 'web',
                value: 'https://www.lijohnttle.com/',
            },
        ],
        status: projectStatuses.RELEASED,
    },
];

const ProjectsSection = ({ screenHeight, isLastSection }) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles({ screenHeight });

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <SectionContentContainer
            title="Side Projects"
            isLoading={isLoading}
            className={classes.root}
            contentRootClassName={classes.contentRoot}
            maxWidth="md"
            canScrollToNextSection={!isLastSection}>
            
            {projects.map((project) => {
                return (
                    <div key={project.name} className={classes.projectRoot}>
                        <div className={classes.projectBullet}></div>
                        <div className={classes.projectContentRoot}>
                            <div className={classes.projectTopPanel}>
                                <Typography variant="h3" align="justify">
                                    {project.name}
                                </Typography>
                                {project.status === projectStatuses.RELEASED ? (
                                    <div title="Status: LIVE" className={`${classes.projectDefaultStatus} ${classes.projectLiveStatus}`}>⬤ LIVE</div>
                                ) : null}
                                {project.status !== projectStatuses.RELEASED ? (
                                    <div title={`Status: ${project.status.toUpperCase()}`} className={classes.projectDefaultStatus}>{project.status.toUpperCase()}</div>
                                ) : null}
                            </div>
                            <Typography variant="subtitle2" align="justify" paragraph>
                                {project.description}
                            </Typography>
                            <div className={classes.projectTechnologyList}>
                                {project.technologies.map((technology) => (
                                    <div key={technology} className={classes.projectTechnology}>{technology}</div>
                                ))}
                            </div>
                            <div className={classes.projectLinks}>
                                {project.links.map((link) => <ContactLink key={link.value} contact={link} fontSize="large" />)}
                            </div>
                        </div>
                    </div>
                );
            })}
        </SectionContentContainer>
    );
};


export {
    ProjectsSection
};
