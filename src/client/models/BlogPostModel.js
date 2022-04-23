import { BlogPostDto } from '../../contracts';

/**
 * Represents a blog post.
 */
 export class BlogPostModel {
    /**
     * @param {BlogPostModel} [props]
     */
    constructor(props) {
        /**
         * The ID of a blog post.
         * @type {String}
         * @public
         */
        this.id = props?.id;
        /**
         * The title of a blog post.
         * @type {String}
         * @public
         */
        this.title = props?.title;
        /**
         * The short description of a blog post.
         * @type {String}
         * @public
         */
        this.description = props?.description;
        /**
         * The content of a blog post.
         * @type {String}
         * @public
         */
        this.content = props?.content;
        /**
         * The URL slug of a blog post.
         * @type {String}
         * @public
         */
        this.slug = props?.slug;
        /**
         * The creation date of a blog post.
         * @type {Date}
         * @public
         */
        this.createdOn = props?.createdOn;
        /**
         * The date of the last update of a blog post.
         * @type {Date}
         * @public
         */
        this.updatedOn = props?.updatedOn;
        /**
         * The last publication date of a blog post.
         * @type {Date}
         * @public
         */
        this.publishedOn = props?.publishedOn;
        /**
         * The value that indicates if blog post has been published and available for users.
         * @type {Boolean}
         * @public
         */
        this.published = props?.published;
    }

    /**
     * Create a blog post model from DTO.
     * @param {BlogPostDto} dto Blog post DTO.
     * @returns {BlogPostModel} 
     */
    static createFromDto(dto) {
        if (!dto) {
            return null;
        }
        
        return new BlogPostModel({
            id: dto.id,
            title: dto.title,
            description: dto.description,
            content: dto.content,
            slug: dto.slug,
            createdOn: dto.createdOn ? new Date(Date.parse(dto.createdOn)) : null,
            updatedOn: dto.updatedOn ? new Date(Date.parse(dto.updatedOn)) : null,
            publishedOn: dto.publishedOn ? new Date(Date.parse(dto.publishedOn)) : null,
            published: dto.published,
        });
    }
}