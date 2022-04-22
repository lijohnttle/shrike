import React from 'react';
import { Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { useUserSession } from '../../../hooks';
import { generatePath, useNavigate } from 'react-router-dom';
import { urlList } from '../../../../static';
import { useStyles } from './styles';


const BlogPostToolBar = ({ slug }) => {
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
        <ArticleContentBlock compact>
            <div className={classes.commandsContainer}>
                <div className={classes.commandContainer}>
                    <Button variant="contained" startIcon={<EditIcon />} onClick={handleEditBlogPost}>Edit</Button>
                </div>
            </div>
        </ArticleContentBlock>
    );
};


export {
    BlogPostToolBar
};
