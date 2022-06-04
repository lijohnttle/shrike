import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Loader } from '../../../components';
import { BlogFilterCategoryModel, BlogFilterModel } from '../../../models/blog'; 
import { useUserSession } from '../../../hooks';


function RenderGroup({ title, children }) {
    return (
        <Box marginBottom={2}>
            <Typography fontWeight="bold">
                {title}
            </Typography>

            <div>
                {children}
            </div>
        </Box>
    );
}

/**
 * Represents a blog filter. 
 * @param {Object} param0 
 * @param {BlogFilterModel} param0.filter
 * @returns 
 */
export function BlogFilter({ filter }) {
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    /** @type {[BlogFilterCategoryModel[], Function]} */
    const [categoriesSelection, setCategoriesSelection] = useState([]);
    const [publishedSelection, setPublishedSelection] = useState('published');
    const [getUserSession] = useUserSession();

    useEffect(() => {
        if (filter) {
            // initialize categories
            const categoriesQueryParams = new Set((searchParams.getAll('category') || []).map(c => c.toLocaleLowerCase()));
            const allCategory = filter.findAllCategory();
            const shouldSelectAll = categoriesQueryParams.size === 0 || categoriesQueryParams.has(allCategory.name.toLowerCase());

            if (shouldSelectAll) {
                setCategoriesSelection([allCategory]);
            }
            else {
                setCategoriesSelection([...filter.categories.filter(c => categoriesQueryParams.has(c.name.toLowerCase()))]);
            }

            // initialize published
            setPublishedSelection(searchParams.get('unpublished')?.toLowerCase() === 'true' ? 'unpublished' : 'published')

            setIsLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        // update query params
        searchParams.delete('category');
        searchParams.delete('unpublished');

        if (categoriesSelection.length > 0) {
            categoriesSelection.forEach(c => searchParams.append('category', c.name.toLowerCase()));
        }

        if (publishedSelection === 'unpublished') {
            searchParams.append('unpublished', true)
        }

        searchParams.sort();
        setSearchParams(searchParams);
    }, [categoriesSelection, publishedSelection]);

    useEffect(() => {
        // reload blog
    }, [isLoading]);

    const handleCategoryFilterChange = useCallback(e => {
        const selectedCategoryName = e.target.value;
        const selectedCategory = filter.categories.find(c => c.name.toLowerCase() === selectedCategoryName.toLowerCase());
        const selectedCategoryIndex = categoriesSelection.indexOf(selectedCategory);

        if (e.target.checked) {
            if (selectedCategory.all) {
                // select only all categories filter
                setCategoriesSelection([selectedCategory]);
            }
            else if (selectedCategoryIndex < 0) {
                // select if it is not already selected 
                const newSelectedFilterCategories = [...categoriesSelection, selectedCategory];

                if (filter
                    .categories
                    .filter(c => !c.all)
                    .map(c => c.name)
                    .every(name => newSelectedFilterCategories.some(c => c.name === name))) {
                    
                    setCategoriesSelection([filter.findAllCategory()]);
                }
                else {
                    setCategoriesSelection([...categoriesSelection, selectedCategory]);
                }
            }
        }
        else {
            if (selectedCategory.all) {
                // deselect all categories
                setCategoriesSelection([]);
            }
            else if (categoriesSelection.some(c => c.all)) {
                // deselect category 'All' and the current one
                setCategoriesSelection([...filter.categories
                    .filter(c => !c.all && c.name !== selectedCategory.name)]);
            }
            else if (selectedCategoryIndex >= 0) {
                // deselect only the current category
                const newSelectedFilterCategories = [...categoriesSelection];
                newSelectedFilterCategories.splice(selectedCategoryIndex, 1);
                setCategoriesSelection(newSelectedFilterCategories);
            }
        }
    });

    const handlePublishedFilterChange = useCallback(e => {
        setPublishedSelection(e.target.value);
    });

    if (isLoading) {
        return <Loader />;
    }

    const selectedAllCategories = categoriesSelection.some(c => c.all);
    const authenticated = !!getUserSession();

    return (
        <div>
            <RenderGroup title="Categories">
                {filter?.categories?.map((category) => (
                    <Box key={category.name}>
                        <FormControlLabel
                            control={<Checkbox
                                value={category.name}
                                checked={selectedAllCategories || categoriesSelection.findIndex(c => c.name === category.name) >= 0}
                                onChange={handleCategoryFilterChange} />}
                            label={category.name} />
                    </Box>
                ))}
            </RenderGroup>

            {authenticated
                ? (
                    <RenderGroup title="Published">
                        <RadioGroup value={publishedSelection} onChange={handlePublishedFilterChange}>
                            <FormControlLabel value="published" control={<Radio />} label="Published" />
                            <FormControlLabel value="unpublished" control={<Radio />} label="Unpublished" />
                        </RadioGroup>
                    </RenderGroup>
                )
                : null}
        </div>
    );
}
