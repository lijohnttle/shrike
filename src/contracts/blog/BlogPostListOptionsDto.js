/**
 * Represents the options of blog posts list request.
 */
export class BlogPostListOptionsDto {
    /**
     * @param {BlogPostListOptionsDto} props 
     */
    constructor(props) {
        /**
         * Get unpublished blog posts.
         * @type {Boolean}
         * @public
         */
        this.unpublished = props?.unpublished;

        /**
         * Filter by categories.
         * @type {String[]}
         * @public
         */
        this.categories = props?.categories;

        /**
         * Skips items.
         * @type {Number}
         * @public
         */
         this.skip = props?.skip;

        /**
         * Limits the number of returned items.
         * @type {Number}
         * @public
         */
        this.take = props?.take;

        /**
         * Current user section. Is required to provide authorization.
         * @type {String}
         * @public
         */
        this.userToken = props?.userToken;
    }
}