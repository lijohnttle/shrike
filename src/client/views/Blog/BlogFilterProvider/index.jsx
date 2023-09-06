import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDataLoader } from '../../../hooks';
import { BlogFilterModel, BlogFilterSelectionModel } from '../../../models';
import { fetchFilterDefinition } from '../../../services/blogService';


/**
 * @param {BlogFilterSelectionModel} selection
 * @param {BlogFilterModel} filter
 * @param {URLSearchParams} searchParams 
 */
function parseQueryString(selection, filter, searchParams) {
    // categories
    const categories = new Set((searchParams.getAll('category') || []).map(c => c.toLocaleLowerCase()));
    const categoryAll = filter.findAllCategory();
    const shouldSelectAll = !!categoryAll && (categories.size === 0 || categoryAll && categories.has(categoryAll.name.toLowerCase()));

    if (shouldSelectAll) {
        selection.categories = [categoryAll];
    }
    else {
        selection.categories = [...filter.categories.filter(c => categories.has(c.name.toLowerCase()))];
    }

    // show unpublished
    selection.unpublished = searchParams.get('unpublished')?.toLowerCase() === 'true';
}

/**
 * @param {BlogFilterSelectionModel} selection
 * @param {URLSearchParams} searchParams 
 * @param {Function} setSearchParams 
 */
function updateQueryString(selection, searchParams, setSearchParams) {
    searchParams.delete('category');
    searchParams.delete('unpublished');

    if (selection.categories.length > 0) {
        selection.categories.forEach(c => searchParams.append('category', c.name.toLowerCase()));
    }

    if (selection.unpublished) {
        searchParams.append('unpublished', true)
    }

    searchParams.sort();
    setSearchParams(searchParams);
}

/**
 * @param {Object} param0 
 * @param {BlogFilterSelectionModel} param0.selection
 * @param {Function} param0.onFilterLoaded 
 * @param {Function} param0.onSelectionChanged 
 * @param {React.ReactNode} param0.children 
 */
export function BlogFilterProvider({
    selection,
    onFilterLoaded,
    onSelectionChanged,
    children,
}) {
    const [filter, setFilter] = useState(new BlogFilterModel());
    const [searchParams, setSearchParams] = useSearchParams();
    const isLoading = useDataLoader(() => fetchFilterDefinition(), setFilter);

    useEffect(() => {
        if (!isLoading) {
            onFilterLoaded(filter);

            const selection = new BlogFilterSelectionModel(); 
            parseQueryString(selection, filter, searchParams);
            
            onSelectionChanged(selection);
        }
    }, [isLoading]);

    useEffect(() => {
        if (selection != null) {
            updateQueryString(selection, searchParams, setSearchParams);
        }
    }, [selection]);

    return (
        <>
            {children}
        </>
    );
}
