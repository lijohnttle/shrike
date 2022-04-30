/**
 * Represents the options of blog posts list request.
 */
export class BlogPostListOptions {
    /**
     * @param {BlogPostListOptions} props 
     */
    constructor(props) {
        /**
         * Get unpublished blog posts.
         * @type {Boolean}
         * @public
         */
        this.unpublished = props?.unpublished;

        /**
         * Current user section. Is required to provide authorization.
         * @type {String}
         * @public
         */
        this.userToken = props?.userToken;

        /**
         * 
         */
        this.take = props?.take;
    }
}