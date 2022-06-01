import { Link, Typography, useTheme } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import RehypeRaw from 'rehype-raw';
import RremarkGfm from 'remark-gfm';
import { BlogPostModel } from '../../models';
import { colors } from '../../themes';
import { parseBlogPostUrl } from '../../utils/url';
import { BlogPostImage } from '../BlogPostImage';


/**
 * 
 * @param {Object} param0
 * @param {BlogPostModel} param0.blogPost
 */
export const BlogMarkdown = ({ blogPost }) => {
    const theme = useTheme();

    let content = blogPost.content;

    return (
        <ReactMarkdown
            children={content}
            rehypePlugins={[RehypeRaw, RremarkGfm]}
            components={{
                a: ({ href, ...otherProps }) => {
                    const parsedUrl = parseBlogPostUrl(href, blogPost);

                    return <Link href={parsedUrl.url} {...otherProps} />;
                },
                img: ({ src, alt }) => {
                    return <BlogPostImage src={src} alt={alt} blogPost={blogPost} />;
                },
                p:  (elementProps) => {
                    // unwrap images
                    if (elementProps.children
                        && elementProps.children.length === 1
                        && elementProps.children[0].props
                        && elementProps.children[0].props.src) { // rendering media without p wrapper
                    
                        return elementProps.children;
                    }

                    return (
                        <Typography variant="body1" paragraph sx={{ overflow: 'auto', marginTop: 0, marginBottom: 3 }}>
                            {elementProps.children}
                        </Typography>)
                },
                h2: (elementProps) => {
                    return (
                        <Typography variant="h2" fontWeight="bold" sx={{ overflow: 'auto', marginTop: 6, marginBottom: 3 }}>
                            {elementProps.children}
                        </Typography>)
                },
                h3: (elementProps) => {
                    return (
                        <Typography variant="h3" fontWeight="bold" sx={{ overflow: 'auto', marginTop: 6, marginBottom: 3 }}>
                            {elementProps.children}
                        </Typography>)
                },
                h4: (elementProps) => {
                    return (
                        <Typography variant="h4" fontWeight="bold" sx={{ overflow: 'auto', marginTop: 4, marginBottom: 2 }}>
                            {elementProps.children}
                        </Typography>)
                },
                ul: (elementProps) => {
                    return (
                        <ul style={{ overflow: 'auto' }}>
                            {elementProps.children}
                        </ul>)
                },
                blockquote: (elementProps) => {
                    return (
                        <blockquote
                            style={{
                                color: colors.grayText,
                                fontStyle: 'italic',
                                margin: 0,
                                padding: '0.5em 40px',
                                background: 'whitesmoke',
                                borderLeft: `8px solid ${colors.grayText}`,
                            }}>
                            {elementProps.children}
                        </blockquote>);
                },
                pre: (elementProps) => {
                    return (
                        <pre
                            style={{
                                background: colors.backgroundComplementary,
                                color: colors.textComplementary,
                                overflowX: 'auto',
                                marginLeft: theme.spacing(-1),
                                marginRight: theme.spacing(-1),
                                paddingLeft: theme.spacing(1),
                                paddingRight: theme.spacing(1),
                                paddingTop: theme.spacing(2),
                                paddingBottom: theme.spacing(2),
                                fontSize: '0.85em',
                            }}>
                            {elementProps.children}
                        </pre>
                    );
                },
                code: (elementProps) => {
                    return (
                        <code>
                            {elementProps.children}
                        </code>
                    );
                },
                td: (elementProps) => {
                    return (
                        <td style={{
                            padding: theme.spacing(1),
                            border: `1px solid gray`,
                        }}>
                            {elementProps.children}
                        </td>
                    );
                },
                th: (elementProps) => {
                    return (
                        <th style={{
                            padding: theme.spacing(1),
                            background: colors.backgroundComplementary,
                            color: colors.textComplementary,
                            border: `1px solid gray`,
                        }}>
                            {elementProps.children}
                        </th>
                    );
                },
            }}
        />
    )
};