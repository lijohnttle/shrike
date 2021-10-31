import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Footer, Header } from '../common';
import { useStyles } from './Page.styles';


class PageOptions {
    constructor() {
        /** @type {string} */
        this.title = '';
    }
}

/**
 * @param {{ title: string, hideHeader: boolean, hideFooter: boolean, children: any }} 
 */
const Page = ({ title, hideHeader, hideFooter, children }) => {
    const classes = useStyles();

    useEffect(() => {
        document.title = title ? `lijohnttle - ${title}` : 'lijohnttle';
    }, []);

    return (
        <div className={classes.root}>
            {hideHeader !== true ? <Header light /> : null}

            <div className={classes.pageContent}>
                {children}
            </div>

            {hideFooter !== true ? <Footer /> : null}
        </div>
    );
};

Page.propTypes = {
    title: PropTypes.string,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    children: PropTypes.any
};


export {
    PageOptions,
    Page
};
