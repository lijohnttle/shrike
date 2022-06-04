import express from 'express';
import { getBlogManager } from '../../../domain';


const router = express.Router();

router.get('/filter/definition', async (_, res) => {
    const blogManager = getBlogManager();

    res.json({
        categories: await blogManager.getCategories(),
    });
});


export {
    router as blogApiRouter,
};
