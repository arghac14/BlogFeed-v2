const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "Users"
    },
    date:{
        type: String
    }
},{timestamps: true})

mongoose.model('Posts', postSchema);