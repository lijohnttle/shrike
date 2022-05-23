import React, { useEffect, useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Loader } from '..';
import { BookDto, BookShelf } from '../../../contracts/books';
import { fetchBooks } from '../../services/goodReadsService';
import { useIsCancelled } from '../../hooks';


/**
 * Represents a book list item.
 * @param {Object} param0 
 * @param {BookDto} param0.book Book.
 * @returns 
 */
function BookListItem({ book }) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width="98px"
            height="160px"
            marginLeft={2}
            marginRight={2}>
            <Link
                display="block"
                overflow="hidden"
                href={book.link}
                target="black"
                title={book.title}
                rel="external">
                <img
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%'
                    }}
                    alt={book.title}
                    border={0}
                    src={book.cover}>
                </img>
            </Link>
        </Box>
    );
}

/**
 * Represents a list of books.
 * @param {Object} param0 
 * @param {Number} param0.count
 * @param {BookShelf} param0.shelf
 * @returns 
 */
export function BookList({ count, shelf }) {
    /** @type {[BookDto[], Function]} */
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isCancelled = useIsCancelled();

    useEffect(() => {
        fetchBooks(count, shelf)
            .then(data => {
                if (!isCancelled.current) {
                    setBooks(data.books);
                }
            })
            .catch(error => {
                if (!isCancelled.current) {
                    console.log(error);
                }
            })
            .finally(() => {
                if (!isCancelled.current) {
                    setIsLoading(false);
                }
            });
    }, []);

    const title = shelf === BookShelf.read ? 'Shelf "Read"' : 'Shelf "Currently Reading"';
    
    return (
        <Box>
            <Box marginBottom={3}>
                <Typography variant="h4" align="center">
                    {title}
                </Typography>
            </Box>

            <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                minHeight="160px">
                {isLoading ? <Loader /> : null}
                
                {!isLoading ? books.map(book => <BookListItem key={book.link} book={book} />) : null}
            </Box>
        </Box>
    );
};

BookList.shelves = BookShelf;
