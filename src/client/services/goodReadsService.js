import axios from 'axios';
import { BookListResultDto } from '../../contracts/books';


/**
 * Retrieves books on a shelf. 
 * @param {Number} count The maximum number of books to fetch.
 * @param {String} shelf The name of a shelf.
 * @returns {Promise<BookListResultDto>} The list of books.
 */
export async function fetchBooks(count, shelf) {
    const url = `/api/goodreads/${shelf}?count=${count}`;

    const resp = await axios.get(url);
    
    if (resp.status == 200) {
        return new BookListResultDto(resp.data);
    }
    else {
        throw resp.statusText;
    }
};
