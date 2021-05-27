import axios from 'axios';
import { JSDOM } from 'jsdom';

function parseWidget(widgetContent) {
    const startHtmlIndex = widgetContent.indexOf('\'') + 1;
    const endHtmlIndex = widgetContent.indexOf('\'', startHtmlIndex + 1);
    const html = widgetContent
        .slice(startHtmlIndex, endHtmlIndex)
        .trim()
        .replaceAll('\\"', '"')
        .replaceAll('\\n', '\n')
        .replaceAll('\\/', '/');

    const data = {
        books: []
    };

    const dom = new JSDOM(html);

    const bookNodes = dom.window.document.querySelectorAll('.gr_grid_book_container a');

    for (let bookNode of bookNodes) {
        const bookTitle = bookNode.getAttribute('title');
        const bookLink = bookNode.getAttribute('href');
        const bookCover = bookNode.querySelector('img').getAttribute('src');

        data.books.push({
            title: bookTitle,
            link: bookLink,
            cover: bookCover,
        });
    }

    return data;
}

async function fetchBooks(userId, count, shelf) {
    const url = `https://www.goodreads.com/review/grid_widget/${userId}?cover_size=medium&hide_link=true&hide_title=true&num_books=${count}&order=d&shelf=${shelf}&sort=date_added&widget_id=${shelf}`;
    const response = await axios.get(url);

    if (response.status === 200) {
        return parseWidget(response.data)
    }

    return null;
};

export { fetchBooks };