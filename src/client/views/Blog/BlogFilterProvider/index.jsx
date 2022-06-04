import React, { useEffect, useState } from 'react';
import { useDataLoader } from '../../../hooks';
import { BlogFilterModel } from '../../../models';
import { fetchFilterDefinition } from '../../../services/blogService';


/**
 * @param {Object} param0 
 * @param {Function} param0.onFilterLoaded 
 * @param {React.ReactNode} param0.children 
 */
export function BlogFilterProvider({
    onFilterLoaded,
    children,
}) {
    const [filter, setFilter] = useState(new BlogFilterModel());
    const isLoading = useDataLoader(() => fetchFilterDefinition(), setFilter);

    useEffect(() => {
        if (!isLoading) {
            onFilterLoaded(filter);
        }
    }, [isLoading]);

    return (
        <>
            {children}
        </>
    );
}
