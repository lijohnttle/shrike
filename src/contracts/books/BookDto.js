/**
 * Represents a book.
 */
export class BookDto {
    /**
     * @param {BookDto} [props]
     */
    constructor(props) {
        /**
         * The title of a book.
         * @type {String}
         * @public
         */
        this.title = props?.title;

        /**
         * The link to a book.
         * @type {String}
         * @public
         */
        this.link = props?.link;

        /**
         * The link to the cover of a book.
         * @type {String}
         * @public
         */
        this.cover = props?.cover;
    }
}