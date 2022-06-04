import React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ContentBlock } from '../../../components';
import { useUserSession } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { pagesDescriptors } from '../../../../static';


function RenderCommandContainer({ children }) {
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center" marginRight={1}>
            {children}
        </Box>
    );
};

export function BlogToolBar() {
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();
    const userSession = getUserSession();

    const handleAddBlogPost = () => {
        navigate(pagesDescriptors.BLOG_POST_NEW.path);
    };

    if (!userSession) {
        return null;
    }

    return (
        <ContentBlock compact>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center">
                <RenderCommandContainer>
                    <Tooltip title="Add a new blog post">
                        <Button variant="text" startIcon={<AddIcon />} onClick={handleAddBlogPost}>
                            Add
                        </Button>
                    </Tooltip>
                </RenderCommandContainer>    
            </Box>
        </ContentBlock>
    );
};
