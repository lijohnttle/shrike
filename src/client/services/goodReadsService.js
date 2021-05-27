import axios from 'axios';

async function loadBooks(count, shelf) {
    const url = `/proxy/goodreads/${shelf}?count=${count}`;

    const resp = await axios.get(url);
    
    if (resp.status == 200) {
        return resp.data.books;
    }
    else {
        throw resp.statusText;
    }
};

export { loadBooks };