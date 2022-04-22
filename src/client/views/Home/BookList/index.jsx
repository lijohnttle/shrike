import React from 'react';
import { Link } from '@mui/material';
import { Box } from '@mui/system';


const BookList = ({ books }) => {
    if (!books) {
        return <React.Fragment></React.Fragment>
    }

    return (
        <React.Fragment>
            {books.map(book => (
                <Box
                    key={book.link}
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
            ))}
        </React.Fragment>
    );
};


export {
    BookList
};
