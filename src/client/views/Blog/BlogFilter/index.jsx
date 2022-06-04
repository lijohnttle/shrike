import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Loader } from '../../../components';
import { BlogFilterCategoryModel, BlogFilterModel } from '../../../models/blog'; 
import { useUserSession } from '../../../hooks';
import { getFilterDefinition } from '../../../services/blogService';


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

export function BlogFilter() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    /** @type {[BlogFilterModel, Function]} */
    const [filter, setFilter] = useState();
    /** @type {[BlogFilterCategoryModel[], Function]} */
    const [categoriesSelection, setCategoriesSelection] = useState([]);
    const [publishedSelection, setPublishedSelection] = useState('published');
    const [getUserSession] = useUserSession();

    useEffect(() => {
        // load filters
        getFilterDefinition()
            .then(result => {
                setFilter(result);

                // initialize categories
                const categoriesQueryParams = new Set((searchParams.getAll('category') || []).map(c => c.toLocaleLowerCase()));
                const allCategory = result.findAllCategory();
                const shouldSelectAll = categoriesQueryParams.size === 0 || categoriesQueryParams.has(allCategory.name.toLowerCase());

                if (shouldSelectAll) {
                    setCategoriesSelection([allCategory]);
                }
                else {
                    setCategoriesSelection([...result.categories.filter(c => categoriesQueryParams.has(c.name.toLowerCase()))]);
                }

                // initialize published
                setPublishedSelection(searchParams.get('unpublished')?.toLowerCase() === 'true' ? 'unpublished' : 'published')
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

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
                // deselect all others
                setCategoriesSelection([selectedCategory]);
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
                                checked={selectedAllCategories || categoriesSelection.findIndex(c => c.name.toLowerCase() === category.name.toLowerCase()) >= 0}
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
