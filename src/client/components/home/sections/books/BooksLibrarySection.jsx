import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { loadBooks } from '../../../../services/goodReadsService';

const BooksLibrarySection = ({ data }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        try {
            const fetchedBooks = loadBooks(10, 'currently-reading');
            setBooks(fetchedBooks);
        }
        catch (exception) {
            console.log(exception);
        }
    }, []);

    return (
        <div>
            <Typography variant="h2">
                Book Library
            </Typography>

            <Box mb={4} mt={2}>
                {/* <GoodReadsBookListWidget title="Currently Reading" userId={userId} shelf="currently-reading" count={20} /> */}
            </Box>
            <Box mb={4}>
                {/* <GoodReadsBookListWidget title="Recently Read" shelf="read" userId={userId} count={10} /> */}
            </Box>
        </div>
    );
};

export default BooksLibrarySection;