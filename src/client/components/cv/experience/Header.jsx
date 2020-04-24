import React from 'react';
import { Typography } from '@material-ui/core';

const Header = ({ position, employer, date, location }) => {
    return (
        <div>
            <Typography>
                <Typography variant="h3" component="span">
                    {position}&nbsp;
                </Typography>
                <Typography component="span">
                    at {employer}
                </Typography>
            </Typography>
            <Typography variant="caption">
                {date}, {location}
            </Typography>
        </div>
    );
};

export { Header };