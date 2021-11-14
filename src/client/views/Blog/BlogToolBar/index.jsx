import React from 'react';
import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { useUserSession } from '../../../hooks';
import { useHistory } from 'react-router';
import { urlList } from '../../../../static';


const BlogToolBar = () => {
    const [getUserSession] = useUserSession();
    const history = useHistory();

    const userSession = getUserSession();

    const handleAddBlogPost = async () => {
        history.push(urlList.NEW_BLOG_POST);
    };

    if (!userSession) {
        return null;
    }

    return (
        <ArticleContentBlock compact>
            <div>
                <Button startIcon={<AddIcon />} onClick={handleAddBlogPost}>Create Post</Button>
            </div>
        </ArticleContentBlock>
    );
};


export {
    BlogToolBar
};
