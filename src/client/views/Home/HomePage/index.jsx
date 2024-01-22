import React from 'react';
import { Page } from '../../../components';
import { useData } from '../../../hooks';
import { BlogSection } from '../BlogSection';


const HomePage = () => {
    const data = useData();

    return (
        <Page title="Home">
            <div>
                <BlogSection disableBottomGutter />
            </div>
        </Page>
    );
}


export {
    HomePage
};
