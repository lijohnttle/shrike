import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { Article, BlogPostContent, ContentBlock } from '../../../components';
import { EditMode } from '../EditBlogPostForm';
import { BlogPostModel } from '../../../models';
import { Box, styled } from '@mui/system';
import { pagesDescriptors } from '../../../../static';


const CommandContainer = styled('div')(({ theme }) => ({
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2)
}));


/**
 * Form for editing an existing or adding a new blog post.
 * @param {Object} props 
 * @param {EditMode} props.mode
 * @param {BlogPostModel} props.blogPost
 * @param {onBlogPostChanged} props.onChange
 * @param {Function} props.onEdit
 * @param {Function} props.onSave
 * @param {Function} [props.onDelete]
 */
const EditBlogPostPreview = (props) => {
    return (
        <Article
            pageDescriptor={props.mode === EditMode.create ? pagesDescriptors.BLOG_POST_NEW : pagesDescriptors.BLOG_POST_EDIT}
            title={props.blogPost.title.toUpperCase()}
            titleMaxWidth="md">
            <ContentBlock maxWidth="md">
                <BlogPostContent blogPost={props.blogPost} />

                <form style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                        <CommandContainer>
                            <FormControlLabel
                                control={<Checkbox checked={props.blogPost.published}
                                name="published"
                                onChange={(e) => props.onChange(e.target.name, e.target.checked)} />}
                                label="Publish" />
                        </CommandContainer>
                        {props.mode === EditMode.edit
                        ? (
                            <CommandContainer>
                                <Button color="error" variant="outlined" onClick={props.onDelete}>DELETE</Button>
                            </CommandContainer>
                        ) : null}
                        <CommandContainer>
                            <Button color="primary" variant="outlined" onClick={props.onEdit}>EDIT</Button>
                        </CommandContainer>
                        <CommandContainer>
                            <Button color="success" variant="contained" onClick={props.onSave}>
                                {props.mode === EditMode.create ? 'CREATE' : 'SAVE'}
                            </Button>
                        </CommandContainer>
                    </Box>
                </form>
            </ContentBlock>
        </Article>
    );
};


export {
    EditBlogPostPreview
};
