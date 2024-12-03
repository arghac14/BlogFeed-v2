const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {GoogleSheetHelper, entities} = require('../helper/googleSheetHelper');

const router = express.Router();

const getAllUsers = async () => {
    const data = await GoogleSheetHelper.get(entities.USERS);
    // Extract rows from the response
    var rows = data;
    const formattedData = rows.map((row, index) => {
        if (index < 2) return null;
        const rowNumber = index + 1;
        const [name, userName, password, profilePhoto, createdAt, updatedAt] = row;
        return {
            id: rowNumber,
            name,
            userName,
            password,
            profilePhoto,
            createdAt,
            updatedAt
        };
    }).filter(Boolean);
    return formattedData;
}

// Signup Route
router.post('/signup', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: 'Username or password can\'t be empty!' });
    }

    try {
        const { name, userName, password } = req.body;
        
        var users = await getAllUsers();

        var user = users.find(u => u.userName == userName);
        console.log(user)

        if (user) {
            return res.status(400).json({ message: 'User with given username already exists!' });
        }

        var hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT, 10));
        hashedPassword = hashedPassword.toString()
        var userRequestData = {
            name,
            userName,
            password: hashedPassword
        }
        const data = await GoogleSheetHelper.post(entities.USERS, userRequestData);
        const token = jwt.sign({ username: userName }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        data.accesstoken = token;
        res.send(data);
    } catch (error) {
        res.status(500).send('Something went wrong!', error);
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: 'Username or password is invalid!' });
    }

    try {
        // fetching user from db
        var users = await getAllUsers();

        var user = users.find(u => u.userName == userName);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        // Generate a JWT token
        const token = jwt.sign({ username: user.userName }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log(user)
        res.status(200).json({ user: user, message: 'Login successful', accesstoken: token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
