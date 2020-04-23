import React from 'react';
import { ToolList } from './ToolList';
import { TechnologyList } from './TechnologyList';
import { AccomplishmentList } from './AccomplishmentList';
import { Header } from './Header';

const Experience = ({ data }) => {
    return (
        <div>
            <Header position={data.position} employer={data.employer} date={data.date} location={data.location} />

            <AccomplishmentList accomplishments={data.accomplishments} />

            <ToolList tools={data.tools} />

            <TechnologyList technologies={data.technologies} />
        </div>
    );
};

export { Experience };