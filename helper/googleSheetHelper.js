const fs = require('fs');
const { google } = require('googleapis');

// Load Google Sheets credentials
const credentials = JSON.parse(fs.readFileSync('credentials.json'));
const SPREADSHEET_ID = '1fV21PBcRH3o31Ggvn_thqvh77sqdDDpvAVa4hBWEPKw';

// Authenticate with Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const entities= {
    USERS: "Users"
}

const entityRange = (entity, entityId = null) =>{
    let firstCol = 'A';
    let lastCol = 'B';
    switch(entity){
        case entities.USERS:
            firstCol = 'A';
            lastCol = 'F'
            break;
    }

    
    return entityId
    ? `${entity}!${firstCol}${entityId}:${lastCol}${entityId}`
    : `${entity}!${firstCol}:${lastCol}`;
}

const processUserPayload = (userRequestData) => {
    const userModelFields = [
        'Name', 'UserName', 'Password', 'ProfilePhoto', 'CreatedAt', 'UpdatedAt'
    ];

    const values = userModelFields.map(field => {
        // Convert both field name and userRequestData keys to lowercase for case-insensitive comparison
        const fieldLowerCase = field.toLowerCase();
        const matchingKey = Object.keys(userRequestData).find(
            key => key.toLowerCase() === fieldLowerCase
        );

        // If CreatedAt is missing, set it to the current date/time
        if (fieldLowerCase === 'createdat') {
            return matchingKey ? userRequestData[matchingKey] : new Date().toISOString();
        }

        // Return the value from userRequestData or null if not found
        return matchingKey ? userRequestData[matchingKey] : null;
    });

    // Return the result wrapped in an object with "values" key and values wrapped in an array
    return { values: [values] };
};

// Initialize Google Sheets API client
const sheets = google.sheets({ version: 'v4', auth });

function extractRowNumber(rangeString) {
    const match = rangeString.match(/(\d+)/); // Match the first sequence of digits
    return match ? parseInt(match[0], 10) : null; // Return the number if found, otherwise null
}

const GoogleSheetHelper = {
    async get(entity, id = null) {
        try {
            if (id && id < 2) {
                throw new Error("ID is not valid.");
            }
            
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: entityRange(entity, id)
            });
            return response.data.values || [];
        } catch (error) {
            console.error(`Something went wrong:`, error.message);
            throw error;
        }
    },

    async post(entity, payload) {
        try {
            var requestBody = processUserPayload(payload);
            console.log(entityRange(entity), requestBody)
            var response = await sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: 'Users!A:F',
                valueInputOption: 'RAW',
                requestBody: requestBody
            });
            console.log(response)
            return { id : extractRowNumber(response.data.updates.updatedRange), message: 'Data added successfully' };
        } catch (error) {
            cconsole.error(`Something went wrong:`, error.message);
            throw error;
        }
    },

    async update(entity, id, payload) {
        try {
            var requestBody = processUserPayload(payload);
            var response = await sheets.spreadsheets.values.update({
                spreadsheetId: SPREADSHEET_ID,
                range: entityRange(entity, id),  // Example: 'Users!A17:E17'
                valueInputOption: 'RAW',  // Use 'RAW' or 'USER_ENTERED' based on your needs
                requestBody: requestBody
            });
            return { id : extractRowNumber(response.data.updatedRange), message: 'Data updated successfully' };
        } catch (error) {
            console.error(`Error updating range "${range}":`, error.message);
            throw error;
        }
    },

    async delete(entity, id) {
        try {
            const range = entityRange(entity, id);
            console.log(range)
            const response = await sheets.spreadsheets.values.clear({
                spreadsheetId: SPREADSHEET_ID,
                range: range,
            });
            const ff = await sheets.spreadsheets.values.update({
                spreadsheetId: SPREADSHEET_ID,
                range: range,
                valueInputOption: 'RAW',
                requestBody: {
                    values: [['DELETED']]
                },
            });
            console.log(ff)
    
    
            return { id: id, message: 'Data deleted successfully' };
        } catch (error) {
            console.error(`Error deleting row with id "${id}":`, error.message);
            throw error;
        }
    }
};

module.exports = {GoogleSheetHelper, entities};
