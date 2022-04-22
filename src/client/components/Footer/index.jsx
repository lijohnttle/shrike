import React from 'react';
import { Container, Typography } from '@mui/material';
import { ContactLink } from '../ContactLink';
import { useData } from '../../hooks';
import { Box } from '@mui/system';
import colors from '../../themes/colors';


const Footer = () => {
    const data = useData();

    return (
        <Box
            color={colors.textComplementary}
            marginTop="auto"
            paddingTop={4}
            paddingBottom={2}
            sx={{
                background: colors.backgroundComplementary,
            }}>
            <Container maxWidth="lg">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    sx={{
                        flexFlow: {
                            xs: 'column nowrap',
                            sm: 'row nowrap',
                        },
                    }}>
                    <Typography variant="caption" align="center">
                        {`​© ${new Date().getFullYear()} by Ivan Cherkasov`}
                    </Typography>

                    <Box
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        alignItems="center">
                        {data.contacts.filter((contact) => contact.types.some((type) => type === 'social'))
                            .map((contact) => <ContactLink key={contact.vendor} contact={contact} dark />)}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};


export {
    Footer
};
