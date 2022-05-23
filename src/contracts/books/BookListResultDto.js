import { BookDto } from './BookDto';

/**
 * Represents a book.
 */
export class BookListResultDto {
    /**
     * @param {BookListResultDto} [props]
     */
    constructor(props) {
        /**
         * Books.
         * @type {BookDto[]}
         * @public
         */
        this.books = props?.books;
    }
}