import React, { useState } from 'react';
import { SectionContentContainer } from '../SectionContentContainer';
import { useStyles } from './styles';


const ProjectsSection = ({ screenHeight }) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles({ screenHeight });

    return (
        <SectionContentContainer title="Projects" isLoading={isLoading} className={classes.root}>
            
        </SectionContentContainer>
    );
};

export {
    ProjectsSection
};
