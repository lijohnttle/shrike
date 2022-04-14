import React from 'react';
import { Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { SectionContentContainer } from '../SectionContentContainer';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';
import { SectionWrapper } from '../SectionWrapper';


const coreValues = [
    {
        title: 'CUSTOMER FOCUS',
        description: 'Customers define requirements and they are the core of a product. It is important to maintain a close relationship with them, work in partnership and prefer collaboration through personal contact.',
    },
    {
        title: 'INTEGRITY & PROFESSIONALISM',
        description: 'Integrity is the key component of business. Without integrity and professionalism there is no trust.',
    },
    {
        title: 'QUALITY',
        description: 'I strive to provide high-quality services and products that meet the expectations and requirements of its customers.',
    },
    {
        title: 'INNOVATION',
        description: 'I am always on the look-out for new tools, techniques and concepts to use in provided services that would allow to get the best results.',
    },
];


const CoreValuesSection = ({ screenHeight, isLastSection }) => {
    const classes = useStyles();

    return (
        <SectionWrapper screenHeight={screenHeight} canScrollToNextSection={!isLastSection}>
            <SectionContentContainer
                title="CORE VALUES"
                contentRootClassName={classes.contentRoot}>

                <div className={classes.coreValuesList}>
                    {coreValues.map(value => (
                        <div key={value.title}>
                            <div className={classes.coreValue}>
                                <Typography variant="h3" paragraph>
                                    {value.title}
                                </Typography>
                                <Typography textAlign="justify" paragraph>
                                    {value.description}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionContentContainer>
        </SectionWrapper>
    );
};

export {
    CoreValuesSection
};
