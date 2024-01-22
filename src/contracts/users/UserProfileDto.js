/**
 * Represents a blog post.
 */
export class UserProfileDto {
    /**
     * @param {UserProfileDto} [props]
     */
    constructor(props) {
        /**
         * The ID of a goodreads account.
         * @type {String}
         * @public
         */
        this.goodReadsUserId = props?.goodReadsUserId;
    }
}