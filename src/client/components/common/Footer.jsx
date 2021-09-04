import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Footer = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="caption" align="center" paragraph={true}>
                {`​© ${new Date().getFullYear()} by Ivan Cherkasov`}
            </Typography>
        </Container>
    );
};

export default Footer;