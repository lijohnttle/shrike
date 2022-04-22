import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import colors from '../../../themes/colors';

export const Summary = () => (
    <React.Fragment>
        <Box
            color={colors.text}
            boxShadow={`14px 14px 0px 0px ${colors.brand}`}
            paddingTop={4}
            paddingBottom={2}
            marginTop={4}
            sx={{
                background: colors.background,
                paddingLeft: {
                    xs: 2,
                    sm: 4,
                },
                paddingRight: {
                    xs: 2,
                    sm: 4,
                },
            }}>
            <Typography variant="h3" fontWeight="bold" paragraph>
                Hi, I am Ivan Cherkasov!
            </Typography>

            <Typography fontSize="1.2rem" paragraph>
                I am a software engineer, traveller, science lover, Sci-Fi fun.
            </Typography>
        </Box>

        <Box
            marginTop={8}
            alignSelf="end"
            sx={{
                '& a': {
                    fontSize: '1.2rem',
                    paddingLeft: 4,
                    paddingRight: 4,
                    paddingTop: 1,
                    paddingBottom: 1,
                },
            }}>
            <Button variant='contained' component={Link} to="/about" endIcon={<AddIcon />} color="brand">
                <span>READ MORE</span>
            </Button>
        </Box>
    </React.Fragment>
);