import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Footer = () => {
    return (
        <Container>
            <Typography variant="caption" align="center" paragraph={true}>
                {`​© ${new Date().getFullYear()} by Ivan Cherkasov`}
            </Typography>
        </Container>
    );
};

export { Footer };