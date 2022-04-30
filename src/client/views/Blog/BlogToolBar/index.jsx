import React from 'react';
import { Button, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ContentBlock } from '../../../components';
import { useAuthenticated, useUserSession } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { pagesDescriptors } from '../../../../static';
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

/**
 * 
 * @param {Object} props
 * @param {Boolean} props.showUnpublished Flag determines to show unpublished blog posts.
 * @param {Function} props.onShowUnpublishedChange Callback that is called on show unpublished flag change.
 * @returns {React.ReactNode}
 */
const BlogToolBar = (props) => {
    const [getUserSession] = useUserSession();
    const navigate = useNavigate();
    const userSession = getUserSession();

    useAuthenticated(props.showUnpublished);

    const handleAddBlogPost = () => {
        navigate(pagesDescriptors.BLOG_POST_NEW.path);
    };

    const handleShowUnpublished = (_, value) => {
        props.onShowUnpublishedChange(value);
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
                                value={props.showUnpublished}
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
