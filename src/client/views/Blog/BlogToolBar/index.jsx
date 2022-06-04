import React, { useCallback } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { Add, FilterAlt, FilterAltOff } from '@mui/icons-material';
import { ContentBlock } from '../../../components';
import { useUserSession } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { pagesDescriptors } from '../../../../static';


function RenderCommandGroupContainer({ children }) {
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
            {children}
        </Box>
    );
};

function RenderLeftCommandContainer({ children }) {
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center" marginRight={1}>
            {children}
        </Box>
    );
};

function RenderRightCommandContainer({ children }) {
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center" marginRight={1}>
            {children}
        </Box>
    );
};

export function BlogToolBar({ 
    isFilterOpen,
    onFilterToggle,
}) {
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();
    const userSession = getUserSession();

    const handleAddBlogPost = useCallback(() => {
        navigate(pagesDescriptors.BLOG_POST_NEW.path);
    });

    return (
        <ContentBlock compact>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <RenderCommandGroupContainer>
                    <RenderLeftCommandContainer>
                        {userSession
                            ? (
                                <Tooltip title="Add a new blog post">
                                    <Button variant="text" startIcon={<Add />} onClick={handleAddBlogPost}>
                                        Add
                                    </Button>
                                </Tooltip>
                            )
                            : null}
                    </RenderLeftCommandContainer>
                </RenderCommandGroupContainer>

                <RenderCommandGroupContainer>
                    <RenderRightCommandContainer>
                        <Tooltip title="Show/hide filter">
                            <Button
                                variant="text"
                                startIcon={isFilterOpen ? <FilterAltOff /> : <FilterAlt />}
                                onClick={onFilterToggle}>
                                Filter
                            </Button>
                        </Tooltip>
                    </RenderRightCommandContainer>
                </RenderCommandGroupContainer>
            </Box>
        </ContentBlock>
    );
};
