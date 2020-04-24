import React from 'react';
import { ToolList } from './ToolList';
import { TechnologyList } from './TechnologyList';
import { AccomplishmentList } from './AccomplishmentList';
import { Header } from './Header';
import { Expander } from '../common/expander/Expander';
import { ExpanderHeader } from '../common/expander/ExpanderHeader';
import { ExpanderContent } from '../common/expander/ExpanderContent';

const Experience = ({ data }) => {
    return (
        <Expander>
            <ExpanderHeader>
                <Header position={data.position} employer={data.employer} date={data.date} location={data.location} />
            </ExpanderHeader>
            <ExpanderContent>
                <AccomplishmentList accomplishments={data.accomplishments} />

                <ToolList tools={data.tools} />

                <TechnologyList technologies={data.technologies} />
            </ExpanderContent>
        </Expander>
    );
};

export { Experience };