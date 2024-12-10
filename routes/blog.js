const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');
const {GoogleSheetHelper, entities} = require('../helper/googleSheetHelper');

// Blog entity endpoints
router.get('/', authenticateToken, async (req, res) => {
    try {
        const data = await GoogleSheetHelper.get(entities.BLOGS);
        // Extract rows from the response
        var rows = data;
        const formattedData = rows.map((row, index) => {
            if (index < 2) return null;
            const rowNumber = index + 1;
            const [title, tag, content, coverPhoto, userId, createdAt, updatedAt] = row;
            return {
                id: rowNumber,
                title,
                tag,
                content,
                coverPhoto,
                userId,
                createdAt,
                updatedAt
            };
        }).filter(Boolean);

        res.json(formattedData);
    } catch (error) {
        res.status(500).send('Failed to retrieve data', error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        var id = req.params.id;
        const data = await GoogleSheetHelper.get(entities.BLOGS, id);
        var rows = data;
        
        if (!rows || rows.length === 0) {
            return res.status(404).send('No data found for the give id:', id);
        }

        const formattedData = rows.map((row, index) => {
            const rowNumber = id; 
            const [title, content, userId, coverPhoto, createdAt, updatedAt] = row;
            return {
                id: rowNumber,
                title,
                content,
                userId,
                coverPhoto,
                createdAt,
                updatedAt
            };
        }).filter(Boolean);

        res.json(formattedData);
    } catch (error) {
        res.status(500).send('Failed to retrieve data', error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { 
            title,
            tag,
            content,
            coverPhoto,
            userId } = req.body;
        var blogRequestData = {
            title,
            tag,
            content,
            coverPhoto,
            userId,
            createdAt : new Date().toISOString()
        }
        console.log(blogRequestData)
        const data = await GoogleSheetHelper.post(entities.BLOGS, blogRequestData);
        res.send(data);
    } catch (error) {
        res.status(500).send('Something went wrong!', error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const id = req.params.id;
        var blogRequestData = {
            title,
            tag,
            content,
            coverPhoto,
            userId
        }
        const data = await GoogleSheetHelper.update(entities.BLOGS, id, blogRequestData);
        res.send(data);
    } catch (error) {
        res.status(500).send('Something went wrong!', error);
    }
});

router.delete('/:blogId', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await GoogleSheetHelper.delete(entities.BLOGS, id);
        res.send(data);
    } catch (error) {
        res.status(500).send('Something went wrong!', error);
    }
});

module.exports = router;