import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import Header from '../common/Header';

const PAGE_TITLE = 'lijohnttle - About';

const AboutPage = () => {
    useEffect(() => {
        document.title = PAGE_TITLE;
    }, []);

    return (
        <div>
            <Header lightTheme />

            <div style={{ marginTop: '64px' }}>
                <Typography variant="h1" align="center">
                    About
                </Typography>
            </div>

            <div style={{ marginTop: '64px' }}>
                <Typography variant="h2" align="center">
                    Page is in development
                </Typography>
            </div>
        </div>
    );
};

export default AboutPage;