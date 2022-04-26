import React, { useEffect, useState } from 'react';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { SectionWrapper } from '../SectionWrapper';


/**
 * 
 * @param {Object} props
 * @param {Number} props.screenHeight
 * @param {Boolean} props.showScrollToNextSection
 * @returns {React.ReactNode}
 */
const BlogSection = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <SectionWrapper screenHeight={props.screenHeight} canScrollToNextSection={props.showScrollToNextSection}>
            <SectionContentWrapper title="BLOG" isLoading={isLoading} maxWidth="md">
                
            </SectionContentWrapper>
        </SectionWrapper>
    );
};


export {
    BlogSection
};
