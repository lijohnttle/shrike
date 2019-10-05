import React from 'react';
import { Typography } from '@material-ui/core';

const AboutSection = () => {
    return (
        <React.Fragment>
            <Typography paragraph variant="h1">
                About me...
            </Typography>

            <Typography paragraph>
                Hi! My name is Ivan Cherkasov.
            </Typography>

            <Typography paragraph>
                I am a Software Engineer with more than 5 years of experience. I graduated from Saint Petersburg State Technological Institute (Technical Univetsity) in Russia with a master degree in computer science. Currently I work in a bank developing financial services that are used by customer from around the world and I am using technologies like C#, .NET, JavaScript, React.js, Oracle Database.
            </Typography>

            <Typography paragraph>
                Previously I lived in Russia, but recently I moved to Wroclaw, Poland. One of my next big goals is moving to Canada.
            </Typography>
        </React.Fragment>
    );
};

export { AboutSection };