import React from 'react';
import { Skeleton } from '@material-ui/lab';

const CvEmptyDataPresenter = ({ data }) => {
    return (
        <Skeleton variant="rect" height="6rem"/>
    );
};

export { CvEmptyDataPresenter };