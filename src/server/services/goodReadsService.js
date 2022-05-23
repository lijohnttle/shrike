import axios from 'axios';
import { JSDOM } from 'jsdom';
import { BookDto, BookListResultDto, BookShelf } from '../../contracts/books';


/**
 * Parses HTML widget to retrieve books details.
 * @param {String} widgetContent 
 * @returns {BookListResultDto}
 */
function parseWidget(widgetContent) {
    let content = widgetContent.split('\n')[0];
    const startHtmlIndex = content.indexOf('\'') + 1;
    const endHtmlIndex = content.lastIndexOf('\'');
    const html = content
        .slice(startHtmlIndex, endHtmlIndex)
        .trim()
        .replaceAll('\\"', '"')
        .replaceAll('\\\'', '\'')
        .replaceAll('\\n', '\n')
        .replaceAll('\\/', '/');

    const result = new BookListResultDto({ books: [] });

    const dom = new JSDOM(html);

    const bookNodes = dom.window.document.querySelectorAll('.gr_grid_book_container a');

    for (let bookNode of bookNodes) {
        const bookTitle = bookNode.getAttribute('title');
        const bookLink = bookNode.getAttribute('href');
        const bookCover = bookNode.querySelector('img').getAttribute('src');

        result.books.push(new BookDto({ 
            title: bookTitle,
            link: bookLink,
            cover: bookCover,
        }));
    }

    return result;
}

/**
 * Fethes a book list from GoodReads.
 * @param {String} userId User id. 
 * @param {Number} count Maximum number of books to retrieve.
 * @param {BookShelf} shelf Shelf name.
 * @returns {Promise<BookListResultDto>}
 */
export async function fetchBooks(userId, count, shelf) {
    const url = `https://www.goodreads.com/review/grid_widget/${userId}?cover_size=medium&hide_link=true&hide_title=true&num_books=${count}&order=d&shelf=${shelf}&sort=date_added&widget_id=${shelf}`;
    const response = await axios.get(url);

    if (response.status === 200) {
        return parseWidget(response.data)
    }

    return null;
};
