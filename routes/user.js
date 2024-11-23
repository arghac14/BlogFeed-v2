const express = require('express');
const router = express.Router();

const {GoogleSheetHelper, entities} = require('../helper/googleSheetHelper');

// Profile entity endpoints

router.get('/', async (req, res) => {
    try {
        const data = await GoogleSheetHelper.get(entities.USERS);
        // Extract rows from the response
        var rows = data;
        const formattedData = rows.map((row, index) => {
            if (index < 2) return null;
            const rowNumber = index + 1;
            const [userName, password, profilePhoto, createdAt, updatedAt] = row;
            return {
                id: rowNumber,
                userName,
                password,
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
        const data = await GoogleSheetHelper.get(entities.USERS, id);
        // Extract rows from the response
        var rows = data;
        console.log(rows)
        
        if (!rows || rows.length === 0) {
            return res.status(404).send('No data found for the give id:', id);
        }

        const formattedData = rows.map((row, index) => {
            const rowNumber = id; 
            const [userName, password, profilePhoto, createdAt, updatedAt] = row;
            return {
                id: rowNumber,
                userName,
                password,
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
    // Add logic for creating a profile
    try {
        const { name, userName, password } = req.body;
        var userRequestData = {
            name,
            userName,
            password
        }
        const data = await GoogleSheetHelper.post(entities.USERS, userRequestData);
        res.send(data);
    } catch (error) {
        res.status(500).send('Something went wrong!', error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, userName, password } = req.body;
        const id = req.params.id;
        var userRequestData = {
            name,
            userName,
            password
        }
        const data = await GoogleSheetHelper.update(entities.USERS, id, userRequestData);
        res.send(data);
    } catch (error) {
        res.status(500).send('Something went wrong!', error);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await GoogleSheetHelper.delete(entities.USERS, id);
        res.send(data);
    } catch (error) {
        res.status(500).send('Something went wrong!', error);
    }
});

module.exports = router;