import React from 'react';
import { Typography } from '@material-ui/core';
import { Label } from '../common/Label';

const TechnologyList = ({ technologies }) => {
    return (
        <Typography variant="body2">
            <b>Technologies:</b><br />
            
            {technologies.map((t, i) => <Label key={i} title={t} />)}
        </Typography>
    );
};

export { TechnologyList };