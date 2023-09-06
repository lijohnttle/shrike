import express from 'express';
import { getUserProfileRepository } from '../../../domain';
import { fetchBooks } from '../../../services/goodReadsService.js';


const router = express.Router();

router.get('/shelves/:shelf', async (req, res) => {
    const shelf = req.params.shelf;
    const count = req.query.count;

    try {
        const userProfile = await getUserProfileRepository().find();
        const userId = userProfile.goodReadsUserId;

        const data = await fetchBooks(
            userId,
            count,
            shelf
        );

        res.send(data);
    }
    catch (exception) {
        res.send(exception);
    };
});


export {
    router as booksApiRouter,
};
