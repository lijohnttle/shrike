import React, { useEffect, useState } from 'react';
import { useIsCancelled } from '../../../hooks';
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
    /** @type {[BlogFilterModel, Function]} */
    const [filter, setFilter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isCancelled = useIsCancelled();

    useEffect(() => {
        fetchFilterDefinition()
            .then(result => {
                if (!isCancelled.current) {
                    setFilter(result);
                }
            })
            .catch(error => {
                if (!isCancelled.current) {
                    console.error(error);

                    setFilter(new BlogFilterModel());
                }
            })
            .finally(() => {
                if (!isCancelled.current) {
                    setIsLoading(false);
                }
            });
    }, []);

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
