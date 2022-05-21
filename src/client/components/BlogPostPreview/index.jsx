import React, { useCallback } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { AccessTimeOutlined, DisplaySettings, FolderOutlined, VisibilityOutlined } from '@mui/icons-material';
import { InternalLink } from '../';
import { useNavigate } from 'react-router';
import { useUserSession } from '../../hooks';
import { BlogPostModel, UserSessionModel } from '../../models';
import * as urlUtils from '../../../utils/urlBuilder';
import { colors } from '../../themes';


/**
 * @readonly
 * @enum {String}
 */
 export const DisplayMode = {
    tiles: 'tiles',
    list: 'list',
};

/**
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 * @param {UserSessionModel} param0.userSession 
 * @return {String}
 */
function SubTitle({ blogPost, userSession }) {
    const publishedDate = blogPost.publishedOn
        ? blogPost.publishedOn.toLocaleDateString(undefined, { dateStyle: 'long' }).toUpperCase()
        : 'NOT PUBLISHED';

    return (
        <>
            <span>
                <AccessTimeOutlined sx={{ verticalAlign: 'text-bottom', marginRight: 0.5, fontSize: '1.16em' }} />
                <span style={{ textAlign: 'middle' }}>
                    {publishedDate}
                </span>
            </span>

            {userSession
                ? (
                    <span>
                        <span>{'\u00a0\u00a0•\u00a0\u00a0'}</span>
                        <VisibilityOutlined sx={{ verticalAlign: 'text-bottom', marginRight: 0.5, fontSize: '1.16em' }} />
                        <span style={{ textAlign: 'middle' }}>
                            {blogPost.visits || 0}
                        </span>
                    </span>
                )
                : null}
        </>
    );
}

/**
 * Represents a blog post preview as a tile view.
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost Blog post.
 * @param {Boolean} param0.showDescription Displays blog description.
 * @param {Boolean} param0.compact Displays in compact mode.
 * @param {UserSessionModel} param0.userSession Current user session.
 * @returns {React.ReactNode}
 */
function TileView({ 
    blogPost,
    showDescription,
    compact,
    userSession
}) {
    return (
        <Box display="flex" flexDirection="column">
            <Typography variant="caption" align="justify" marginBottom={1}>
                <SubTitle blogPost={blogPost} userSession={userSession} />
            </Typography>

            <InternalLink
                to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                sx={{
                    display: 'block',
                    overflow: 'hidden',
                    aspectRatio: '3/2',
                    marginBottom: 2,
                    backgroundColor: colors.selectionBackground,
                }}>
                {blogPost.descriptionImage
                    ? (
                        <img
                            src={urlUtils.getBlogPostAttachmentUrlPath(blogPost.slug, blogPost.descriptionImage)}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }} />
                    ) : null}
            </InternalLink>

            <InternalLink
                to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                withoutUnderline
                sx={{
                    position: 'relative',
                    color: colors.text,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                }}>

                {compact
                    ? (
                        <Tooltip title={blogPost.title}>
                            <Box position="relative">
                                <Typography variant="h5">
                                    &nbsp;
                                </Typography>
                                <Typography
                                    variant="h5"
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    width="100%"
                                    noWrap>
                                    {blogPost.title.toUpperCase()}
                                </Typography>
                            </Box>
                        </Tooltip>
                    )
                    : (
                        <Typography variant="h3" gutterBottom={showDescription}>
                            {blogPost.title.toUpperCase()}
                        </Typography>
                    )}

                {showDescription
                    ? (
                        <Typography variant="body1" textAlign="justify">
                            {blogPost.description}
                        </Typography>
                    )
                    : null}

                <Box flex={1} />

                <Typography variant="body1" marginTop={1} fontWeight="bold">
                    {blogPost.category
                        ? (
                            <>
                                <FolderOutlined sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                                <span style={{ verticalAlign: 'middle' }}>
                                    {blogPost.category}
                                </span>
                            </>
                        )
                        : <>&nbsp;</>}
                </Typography>
            </InternalLink>
        </Box>
    );
}

/**
 * Represents a blog post preview as a list item view.
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost Blog post.
 * @param {Boolean} param0.showDescription Displays blog description.
 * @param {Boolean} param0.compact Displays in compact mode.
 * @param {UserSessionModel} param0.userSession Current user session.
 * @returns {React.ReactNode}
 */
function ListView({ 
    blogPost,
    showDescription,
    compact,
    userSession
}) {
    return (
        <Box display="flex" flexDirection="row" flexWrap="nowrap">
            <InternalLink
                to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                sx={{
                    display: 'block',
                    overflow: 'hidden',
                    aspectRatio: '3/2',
                    marginRight: 2,
                    backgroundColor: colors.selectionBackground,
                    width: '256px',
                }}>
                {blogPost.descriptionImage
                    ? (
                        <img
                            src={urlUtils.getBlogPostAttachmentUrlPath(blogPost.slug, blogPost.descriptionImage)}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }} />
                    ) : null}
            </InternalLink>

            <InternalLink
                to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                withoutUnderline
                sx={{
                    position: 'relative',
                    color: colors.text,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                }}>
                
                <Typography variant="caption" align="justify" marginBottom={1}>
                    <SubTitle blogPost={blogPost} userSession={userSession} />
                </Typography>

                {compact
                    ? (
                        <Tooltip title={blogPost.title}>
                            <Box position="relative">
                                <Typography variant="h5">
                                    &nbsp;
                                </Typography>
                                <Typography
                                    variant="h5"
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    width="100%"
                                    noWrap>
                                    {blogPost.title.toUpperCase()}
                                </Typography>
                            </Box>
                        </Tooltip>
                    )
                    : (
                        <Typography variant="h3" gutterBottom={showDescription}>
                            {blogPost.title.toUpperCase()}
                        </Typography>
                    )}

                {showDescription
                    ? (
                        <Typography variant="body1" textAlign="justify">
                            {blogPost.description}
                        </Typography>
                    )
                    : null}

                <Box flex={1} />

                <Typography variant="body1" marginTop={1} fontWeight="bold">
                    {blogPost.category
                        ? (
                            <>
                                <FolderOutlined sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                                <span style={{ verticalAlign: 'middle' }}>
                                    {blogPost.category}
                                </span>
                            </>
                        )
                        : <>&nbsp;</>}
                </Typography>
            </InternalLink>
        </Box>
    );
}

/**
 * Represents a blog post preview.
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost Blog post.
 * @param {Boolean} param0.showDescription Displays blog description.
 * @param {Boolean} param0.compact Displays in compact mode.
 * @param {DisplayMode} param0.displayMode Display mode.
 * @returns {React.ReactNode}
 */
export function BlogPostPreview({ 
    blogPost,
    showDescription,
    compact,
    displayMode
}) {
    displayMode = displayMode || DisplayMode.tiles;

    const [getUserSession] = useUserSession();
    const navigate = useNavigate();
    const userSession = getUserSession();

    const handleClick = useCallback(() => navigate(urlUtils.getBlogPostUrlPath(blogPost.slug)));

    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{
                flex: '1',
                background: '#fafafa',
                border: '1px solid #efefef',
                cursor: 'pointer',
                padding: {
                    xs: 2,
                    sm: compact ? 2 : 4,
                },

                '&:hover': {
                    background: '#efefef',
                },
            }}
            onClick={handleClick}>
            {displayMode === DisplayMode.tiles
                ? <TileView blogPost={blogPost} showDescription={showDescription} compact={compact} userSession={userSession} />
                : <ListView blogPost={blogPost} showDescription={showDescription} compact={compact} userSession={userSession} />}
        </Box>
    );
}

BlogPostPreview.displayMode = DisplayMode;
