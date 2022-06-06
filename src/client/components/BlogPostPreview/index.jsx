import React from 'react';
import { Box, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AccessTimeOutlined, FolderOutlined, ChevronRight, VisibilityOutlined } from '@mui/icons-material';
import { InternalLink } from '../';
import { useUserSession } from '../../hooks';
import { BlogPostModel, UserSessionModel } from '../../models';
import * as urlUtils from '../../../utils/urlBuilder';
import { colors, shadows } from '../../themes';


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
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 * @param {Boolean} param0.compact
 * @param {Boolean} param0.tile
 * @returns 
 */
function RenderReadButton({ blogPost, compact, tile }) {
    const theme = useTheme();
    const lessThanSm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <InternalLink
            to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                color: colors.grayText,
                paddingLeft: {
                    xs: 2,
                    sm: compact ? 2 : (tile ? 6 : 4),
                },
                paddingRight: {
                    xs: 2,
                    sm: (compact || !tile) ? 2 : 4,
                },

                '&:hover': {
                    background: colors.active,
                    color: colors.activeText,
                },
            }}>
            {(compact || lessThanSm) ? null : <>READ&nbsp;</>}<ChevronRight />
        </InternalLink>
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
        <Box
            display="flex"
            flexDirection="column"
            flex={1}
            sx={{
                marginTop: {
                    xs: 2,
                    sm: compact ? 2 : 4,
                },
            }}>
            <Typography
                variant="caption"
                align="justify"
                marginBottom={1}
                sx={{
                    marginLeft: {
                        xs: 2,
                        sm: compact ? 2 : 4,
                    },
                    marginRight: {
                        xs: 2,
                        sm: compact ? 2 : 4,
                    },
                }}>
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
                    marginLeft: {
                        xs: 2,
                        sm: compact ? 2 : 4,
                    },
                    marginRight: {
                        xs: 2,
                        sm: compact ? 2 : 4,
                    },
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
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: {
                        xs: 2,
                        sm: compact ? 2 : 4,
                    },
                    marginRight: {
                        xs: 2,
                        sm: compact ? 2 : 4,
                    },
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
                        <Typography variant="h3">
                            {blogPost.title.toUpperCase()}
                        </Typography>
                    )}
            </InternalLink>

            {showDescription
                ? (
                    <Typography
                        variant="body1"
                        textAlign="justify"
                        sx={{
                            marginTop: 2,
                            marginBottom: 2,
                            marginLeft: {
                                xs: 2,
                                sm: compact ? 2 : 4,
                            },
                            marginRight: {
                                xs: 2,
                                sm: compact ? 2 : 4,
                            },
                        }}>
                        {blogPost.description}
                    </Typography>
                )
                : null}

            <Box flex={1} />

            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginTop={2}
                sx={{
                    borderTop: '1px solid #eaeaea'
                }}>
                <Typography
                    variant="body1"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingRight={2}
                    fontWeight="bold"
                    sx={{
                        paddingLeft: {
                            xs: 2,
                            sm: compact ? 2 : 4,
                        }
                    }}>
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

                <RenderReadButton blogPost={blogPost} compact={compact} tile={true} />
            </Box>
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
        <Box display="flex" flexDirection="column">
            <Typography
                variant="caption"
                align="justify"
                marginTop={2}
                marginBottom={1}
                sx={{
                    marginLeft: 2,
                    marginRight: {
                        xs: 2,
                        sm: compact ? 2 : 4,
                    },
                }}>
                <SubTitle blogPost={blogPost} userSession={userSession} />
            </Typography>

            <Box
                display="flex"
                flexDirection="row"
                flexWrap="nowrap"
                sx={{
                    marginLeft: 2,
                    marginRight: {
                        xs: 2,
                        sm: compact ? 2 : 4,
                    },
                }}>
                <InternalLink
                    to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                    sx={{
                        display: 'block',
                        overflow: 'hidden',
                        flexShrink: 0,
                        aspectRatio: '3/2',
                        marginRight: 4,
                        backgroundColor: colors.selectionBackground,
                        width: '256px',
                        lineHeight: 0,
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

                <Box>
                    <InternalLink
                        to={urlUtils.getBlogPostUrlPath(blogPost.slug)}
                        withoutUnderline
                        sx={{
                            position: 'relative',
                            color: 'inherit',
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
                                <Typography variant="h3">
                                    {blogPost.title.toUpperCase()}
                                </Typography>
                            )}
                    </InternalLink>

                    {showDescription
                        ? (
                            <Typography
                                variant="body1"
                                textAlign="justify"
                                sx={{
                                    marginTop: {
                                        xs: 1,
                                        sm: compact ? 1 : 2,
                                    },
                                }}>
                                {blogPost.description}
                            </Typography>
                        )
                        : null}
                </Box>
            </Box>

            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginTop={2}
                sx={{
                    borderTop: '1px solid #eaeaea'
                }}>
                <Typography
                    variant="body1"
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={2}
                    paddingRight={2}
                    fontWeight="bold">
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

                <RenderReadButton blogPost={blogPost} compact={compact} />
            </Box>
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
    const userSession = getUserSession();

    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{
                flex: '1',
                background: colors.paperBackground,
                border: `1px solid ${colors.paperBorder}`,
                boxShadow: shadows.paper,
            }}>
            {displayMode === DisplayMode.tiles
                ? <TileView blogPost={blogPost} showDescription={showDescription} compact={compact} userSession={userSession} />
                : <ListView blogPost={blogPost} showDescription={showDescription} compact={compact} userSession={userSession} />}
        </Box>
    );
}

BlogPostPreview.displayMode = DisplayMode;
