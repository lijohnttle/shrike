import mongoose from 'mongoose';
import {
    ResponseDto,
    BlogPostDto,
    BlogPostResponseDto,
    BlogPostListResponseDto } from '../../../../contracts';
import { BlogPost } from '../../../data/models/blog/BlogPost';
import { getAccessValidator } from '../../../domain';


/**
 * Converts data model of a blog post into DTO. 
 * @param {*} rawBlogPost 
 * @returns {BlogPostDto}
 */
const convertToBlogPostMetadata = (rawBlogPost) => {
    return new BlogPostDto({
        id: rawBlogPost._id,
        title: rawBlogPost.title,
        slug: rawBlogPost.slug,
        description: rawBlogPost.description,
        content: rawBlogPost.content,
        createdOn: rawBlogPost.createdOn.toUTCString(),
        updatedOn: rawBlogPost.updatedOn.toUTCString(),
        publishedOn: rawBlogPost.publishedOn ? rawBlogPost.publishedOn.toUTCString() : null,
        published: !!rawBlogPost.published,
    });
};


const queryResolvers = {
    blogPostList: async (_, { includeUnpublished, accessToken }) => {

        try {
            if (includeUnpublished) {
                if (!getAccessValidator().validateAdminAccess(accessToken)) {
                    return ResponseDto.failUnauthorized();
                }
            }

            const filter = { };

            if (!includeUnpublished) {
                filter.published = true;
            }

            const rawBlogPosts = await BlogPost.find(filter);

            const blogPosts = rawBlogPosts.map(convertToBlogPostMetadata);

            return new BlogPostListResponseDto({ success: true, blogPosts });
        }
        catch (error) {
            console.error(error);

            return ResponseDto.fail('Error occured while retrieving a list of blog posts');
        }
    },
    blogPost: async (_, { slug, accessToken }) => {

        try {
            const rawBlogPost = await BlogPost.findOne({ slug: slug });

            if (!rawBlogPost) {
                return ResponseDto.success();
            }

            if (!rawBlogPost.published) {
                if (!accessToken || !getAccessValidator().validateAdminAccess(accessToken)) {
                    return ResponseDto.failUnauthorized();
                }
            }

            return new BlogPostResponseDto({
                success: true,
                blogPost: convertToBlogPostMetadata(rawBlogPost),
            });
        }
        catch (error) {
            console.error(error);

            return ResponseDto.fail('Error occured while retrieving a blog post');
        }
    },
};

const mutationResolvers = {
    createBlogPost: async (_, { blogPost, accessToken }) => {

        try {
            if (!getAccessValidator().validateAdminAccess(accessToken)) {
                return ResponseDto.failUnauthorized();
            }

            const newBlogPost = new BlogPost(blogPost);
            newBlogPost.createdOn = new Date();
            newBlogPost.updatedOn = newBlogPost.createdOn;

            if (blogPost.published) {
                newBlogPost.publishedOn = newBlogPost.createdOn;
                newBlogPost.published = true;
            }

            await newBlogPost.save();

            return ResponseDto.success();
        }
        catch (error) {
            console.error(error);

            return ResponseDto.fail('Error occured while creating a blog post');
        }
    },
    editBlogPost: async (_, { blogPost, accessToken }) => {

        try {
            if (!getAccessValidator().validateAdminAccess(accessToken)) {
                return ResponseDto.failUnauthorized();
            }

            const existingBlogPost = await BlogPost.findOne({ _id: mongoose.Types.ObjectId(blogPost.id) });

            if (!existingBlogPost) {
                return ResponseDto.failNotFound();
            }

            existingBlogPost.title = blogPost.title;
            existingBlogPost.description = blogPost.description;
            existingBlogPost.content = blogPost.content;
            existingBlogPost.slug = blogPost.slug;
            existingBlogPost.published = blogPost.published;
            existingBlogPost.updatedOn = new Date();

            if (existingBlogPost.published) {
                if (!existingBlogPost.publishedOn) {
                    existingBlogPost.publishedOn = existingBlogPost.updatedOn;
                }
            }
            else {
                existingBlogPost.publishedOn = null;
            }

            await existingBlogPost.save();

            return ResponseDto.success();
        }
        catch (error) {
            console.error(error);

            ResponseDto.fail('Error occured while saving a blog post');
        }
    },
};


export {
    queryResolvers,
    mutationResolvers,
}
