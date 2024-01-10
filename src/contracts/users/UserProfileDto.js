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

        /**
         * The header of a greetings message.
         * @type {String}
         * @public
         */
        this.greetingsHeader = props?.greetingsHeader;

        /**
         * The text of a greetings message.
         * @type {String}
         * @public
         */
        this.greetingsText = props?.greetingsText;

        /**
         * The text of a user profile summary.
         * @type {String}
         * @public
         */
        this.summary = props?.summary;
    }
}