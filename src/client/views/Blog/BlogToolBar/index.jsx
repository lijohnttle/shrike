import React from 'react';
import { Button, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ContentBlock } from '../../../components/ContentBlock';
import { useAuthenticated, useUserSession } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { urlList } from '../../../../static';
import { Box, styled } from '@mui/system';


const CommandGroupContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
})); 

const CommandContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    marginRight: theme.spacing(1),
})); 


const BlogToolBar = ({ showUnpublished, setShowUnpublished }) => {
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();
    useAuthenticated(showUnpublished);

    const userSession = getUserSession();

    const handleAddBlogPost = () => {
        navigate(urlList.BLOG_POST_NEW);
    };

    const handleShowUnpublished = (_, value) => {
        setShowUnpublished(value);
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
                <CommandGroupContainer>
                    <CommandContainer>
                        <Tooltip title="Add a new blog post">
                            <Button variant="text" startIcon={<AddIcon />} onClick={handleAddBlogPost}>
                                Add
                            </Button>
                        </Tooltip>
                    </CommandContainer>    
                </CommandGroupContainer>
                <CommandGroupContainer>
                    <CommandContainer>
                        <Tooltip title="Show published/unpublished blog posts">
                            <ToggleButtonGroup
                                color="primary"
                                value={showUnpublished}
                                exclusive
                                size="small"
                                onChange={handleShowUnpublished}>
                                <ToggleButton value={false}>PUBLISED</ToggleButton>
                                <ToggleButton value={true}>UNPUBLISHED</ToggleButton>
                            </ToggleButtonGroup>
                        </Tooltip>
                    </CommandContainer>
                </CommandGroupContainer>
            </Box>
        </ContentBlock>
    );
};


export {
    BlogToolBar
};
