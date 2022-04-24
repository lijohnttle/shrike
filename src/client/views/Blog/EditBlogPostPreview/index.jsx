import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useStyles } from './styles';
import { Article } from '../../../components/Article';
import { ContentBlock } from '../../../components/ContentBlock';
import { BlogMarkdown } from '../../../components/BlogMarkdown';


const EditBlogPostPreview = ({
        isCreation,
        blogPostTitle,
        blogPostAttachments,
        blogPostContent,
        blogPostPublish,
        onEdit,
        onSave
    }) => {

    const classes = useStyles();

    const editButtonClickHandler = () => {
        onEdit();
    };

    return (
        <Article title={blogPostTitle.toUpperCase()} compact>
            <ContentBlock>
                <div className={classes.contentRoot}>
                    <BlogMarkdown attachments={blogPostAttachments} children={blogPostContent} />

                    <form className={classes.form}>
                        <div className={classes.commandsContainer}>
                            <div className={classes.commandContainer}>
                                <FormControlLabel control={<Checkbox checked={blogPostPublish} onChange={(e) => setBlogPostPublish(e.target.checked)} />} label="Publish" />
                            </div>
                            <div className={classes.commandContainer}>
                                <Button color="primary" variant="outlined" onClick={editButtonClickHandler}>EDIT</Button>
                            </div>
                            <div className={classes.commandContainer}>
                                <Button color="success" variant="contained" onClick={onSave}>{isCreation ? 'CREATE' : 'SAVE'}</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </ContentBlock>
        </Article>
    );
};


export {
    EditBlogPostPreview
};
