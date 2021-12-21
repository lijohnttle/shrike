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
    // {
    //     name: 'Personal Web-Site',
    //     description: 'My personal web-site.',
    //     technologies: ['JavaScript', 'React', 'Node.JS', 'Express', 'GraphQL', 'MongoDB'],
    //     links: [
    //         {
    //             vendor: 'github',
    //             value: 'https://github.com/lijohnttle/personal-website',
    //         },
    //         {
    //             vendor: 'web',
    //             value: 'https://www.lijohnttle.com/',
    //         },
    //     ],
    // },
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
    },
    // {
    //     name: 'Monsterlution',
    //     description: 'A blockchain game.',
    //     technologies: ['C#', 'Unity 3D'],
    //     links: [
    //         {
    //             vendor: 'github',
    //             value: 'https://github.com/lijohnttle/monsterlution',
    //         },
    //     ],
    // },
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
                        <div className={classes.projectContent}>
                            <div className={classes.projectTopPanel}>
                                <div className={classes.projectTitle}>
                                    <Typography variant="h3" align="justify">
                                        {project.name.toUpperCase()}
                                    </Typography>
                                </div>
                            </div>
                            <Typography variant="subtitle2" align="justify">
                                {project.description}
                            </Typography>
                        </div>

                        <div className={classes.projectLinks}>
                            {project.links.map((link) => <ContactLink key={link.value} contact={link} fontSize="large" />)}
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
