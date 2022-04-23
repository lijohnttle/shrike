/**
 * Represents a blog post.
 */
export class BlogPostDto {
    /**
     * @param {BlogPostDto} [props]
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
         * @type {String}
         * @public
         */
        this.createdOn = props?.createdOn;
        /**
         * The date of the last update of a blog post.
         * @type {String}
         * @public
         */
        this.updatedOn = props?.updatedOn;
        /**
         * The last publication date of a blog post.
         * @type {String}
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
}