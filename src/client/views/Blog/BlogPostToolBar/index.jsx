import React from 'react';
import { Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { ContentBlock } from '../../../components/ContentBlock';
import { useUserSession } from '../../../hooks';
import { generatePath, useNavigate } from 'react-router-dom';
import { urlList } from '../../../../static';
import { useStyles } from './styles';


const BlogPostToolBar = ({ slug, maxWidth }) => {
    const [getUserSession] = useUserSession();
    const classes = useStyles();
    const navigate = useNavigate();

    const userSession = getUserSession();

    const handleEditBlogPost = async () => {
        navigate(generatePath(urlList.BLOG_POST_EDIT, { slug }));
    };

    if (!userSession) {
        return null;
    }

    return (
        <ContentBlock compact maxWidth={maxWidth || 'md'}>
            <div className={classes.commandsContainer}>
                <div className={classes.commandContainer}>
                    <Button variant="contained" startIcon={<EditIcon />} onClick={handleEditBlogPost}>Edit</Button>
                </div>
            </div>
        </ContentBlock>
    );
};


export {
    BlogPostToolBar
};
