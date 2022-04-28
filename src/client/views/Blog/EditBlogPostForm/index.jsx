import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { Article } from '../../../components/Article';
import { ContentBlock } from '../../../components/ContentBlock';
import { BlogPostModel } from '../../../models/BlogPostModel';
import { Box, styled } from '@mui/system';
import { FileUpload } from '../../../components/FileUpload';
import { pagesDescriptors } from '../../../../static';


const FieldContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
}));

const CommandContainer = styled('div')(({ theme }) => ({
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2)
}));

/**
 * @readonly
 * @enum {String}
 */
export const EditMode = {
    create: 'create',
    edit: 'edit',
};

/**
 * Callback for blog post changes notifications.
 *
 * @callback onBlogPostChanged
 * @param {string} key The name of a changed property.
 * @param {any} value The new value of a changed property.
 */

/**
 * Form for editing an existing or adding a new blog post.
 * @param {Object} props 
 * @param {EditMode} props.mode
 * @param {BlogPostModel} props.blogPost
 * @param {onBlogPostChanged} props.onChange
 * @param {Function} props.onPreview
 * @param {Function} props.onSave
 * @param {Function} [props.onDelete]
 */
const EditBlogPostForm = (props) => {
    return (
        <Article
            pageDescriptor={props.mode === EditMode.create ? pagesDescriptors.BLOG_POST_NEW : pagesDescriptors.BLOG_POST_EDIT}
            title={props.mode === EditMode.create ? 'NEW BLOG POST' : 'EDIT BLOG POST'}
            titleMaxWidth="md">
            <ContentBlock maxWidth="md">
                <form style={{ display: 'flex', flexDirection: 'column' }}>
                    <FieldContainer>
                        <TextField
                            required
                            label="Title"
                            name="title"
                            defaultValue={props.blogPost.title}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </FieldContainer>
                    <FieldContainer>
                        <TextField
                            required
                            label="Slug"
                            name="slug"
                            defaultValue={props.blogPost.slug}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </FieldContainer>
                    <FieldContainer>
                        <TextField
                            required
                            label="Description"
                            multiline
                            maxRows={4}
                            name="description"
                            defaultValue={props.blogPost.description}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </FieldContainer>
                    <FieldContainer>
                        <TextField
                            label="Description Image"
                            name="descriptionImage"
                            defaultValue={props.blogPost.descriptionImage}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </FieldContainer>
                    <FieldContainer>
                        <TextField
                            required
                            label="Content"
                            multiline
                            rows={16}
                            name="content"
                            defaultValue={props.blogPost.content}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </FieldContainer>
                    <FieldContainer>
                        <FileUpload
                            label="Attachments"
                            multiple
                            attachments={props.blogPost.attachments}
                            onChange={attachments => props.onChange('attachments', attachments)} />
                    </FieldContainer>
                    
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
                            <Button color="primary" variant="outlined" onClick={props.onPreview}>PREVIEW</Button>
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

EditBlogPostForm.propTypes = {
    mode: PropTypes.oneOf(Object.values(EditMode)).isRequired,
    blogPost: PropTypes.instanceOf(BlogPostModel).isRequired,
    onChange: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
};

EditBlogPostForm.modes = EditMode;


export {
    EditBlogPostForm,
};
