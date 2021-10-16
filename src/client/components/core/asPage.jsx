import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Footer, Header } from '../common';
import { withGA } from './analytics';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    }
}));

const asPage = (WrappedComponent, options) => {
    const PageWrapper = (props) => {
        // Update page title
        if (options?.title) {
            useEffect(() => {
                document.title = `lijohnttle - ${options.title}`;
            }, []);
        }

        const classes = useStyles();

        let headerPlaceholder = null;
        let footerPlaceholder = null;

        if (options) {
            if (options.showHeader !== false) {
                headerPlaceholder = <Header light />
            }
    
            if (options.showFooter !== false) {
                footerPlaceholder = <Footer />
            }
        }

        return (
            <div className={classes.root}>
                {headerPlaceholder}

                <WrappedComponent {...props} />

                {footerPlaceholder}
            </div>
        );
    };

    return withGA(PageWrapper);
};

export default asPage;