import React, { useCallback } from 'react';
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import {
    BlogFilterModel,
    BlogFilterSelectionModel } from '../../../models'; 
import { useUserSession } from '../../../hooks';


function RenderGroup({ title, children }) {
    return (
        <Box marginBottom={4}>
            <Typography fontWeight="bold" marginBottom={2}>
                {title}
            </Typography>

            <Box marginLeft={1}>
                {children}
            </Box>
        </Box>
    );
}

/**
 * Represents a blog filter. 
 * @param {Object} param0 
 * @param {BlogFilterModel} param0.filter
 * @param {BlogFilterSelectionModel} param0.selection
 * @param {Function} param0.onSelectionChanged
 * @returns 
 */
export function BlogFilter({ filter, selection, onSelectionChanged }) {
    const [getUserSession] = useUserSession();

    const handleCategoryFilterChange = useCallback(e => {
        const selectedCategoryName = e.target.value;
        const selectedCategory = filter.categories.find(c => c.name.toLowerCase() === selectedCategoryName.toLowerCase());
        const selectedCategoryIndex = selection.categories.indexOf(selectedCategory);

        if (e.target.checked) {
            if (selectedCategory.all) {
                // select only all categories filter
                onSelectionChanged(new BlogFilterSelectionModel({
                    ...selection,
                    categories: [selectedCategory],
                }));
            }
            else if (selectedCategoryIndex < 0) {
                // select if it is not already selected 
                const newSelectedFilterCategories = [...selection.categories, selectedCategory];

                if (filter
                    .categories
                    .filter(c => !c.all)
                    .map(c => c.name)
                    .every(name => newSelectedFilterCategories.some(c => c.name === name))) {
                    
                    onSelectionChanged(new BlogFilterSelectionModel({
                        ...selection,
                        categories: [filter.findAllCategory()],
                    }));
                }
                else {
                    onSelectionChanged(new BlogFilterSelectionModel({
                        ...selection,
                        categories: [...selection.categories, selectedCategory],
                    }));
                }
            }
        }
        else {
            if (selectedCategory.all) {
                // deselect all categories
                onSelectionChanged(new BlogFilterSelectionModel({
                    ...selection,
                    categories: [],
                }));
            }
            else if (selection.categories.some(c => c.all)) {
                // deselect category 'All' and the current one
                onSelectionChanged(new BlogFilterSelectionModel({
                    ...selection,
                    categories: [...filter.categories.filter(c => !c.all && c.name !== selectedCategory.name)],
                }));
            }
            else if (selectedCategoryIndex >= 0) {
                // deselect only the current category
                const newSelectedFilterCategories = [...selection.categories];
                newSelectedFilterCategories.splice(selectedCategoryIndex, 1);

                onSelectionChanged(new BlogFilterSelectionModel({
                    ...selection,
                    categories: newSelectedFilterCategories,
                }));
            }
        }
    });

    const handlePublishedFilterChange = useCallback(e => {
        if (selection) {
            onSelectionChanged(new BlogFilterSelectionModel({
                ...selection,
                unpublished: e.target.value === 'unpublished',
            }));
        }
    });

    if (!filter || !selection) {
        return null;
    }

    const selectedAllCategories = selection.categories.some(c => c.all);
    const authenticated = !!getUserSession();

    return (
        <div>
            <RenderGroup title="CATEGORIES">
                {filter?.categories?.map((category) => (
                    <Box key={category.name}>
                        <FormControlLabel
                            control={<Checkbox
                                value={category.name}
                                checked={selectedAllCategories || selection.categories.findIndex(c => c.name === category.name) >= 0}
                                onChange={handleCategoryFilterChange} />}
                            label={category.displayName()}
                            sx={{ width: '100%' }} />
                    </Box>
                ))}
            </RenderGroup>

            {authenticated
                ? (
                    <RenderGroup title="PUBLISHED">
                        <RadioGroup value={selection.unpublished ? 'unpublished' : 'published'} onChange={handlePublishedFilterChange}>
                            <FormControlLabel value="published" control={<Radio />} label="Published" />
                            <FormControlLabel value="unpublished" control={<Radio />} label="Unpublished" />
                        </RadioGroup>
                    </RenderGroup>
                )
                : null}
        </div>
    );
}
