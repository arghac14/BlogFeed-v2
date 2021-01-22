const jwt = require('jsonwebtoken');
const {JWT} = require('../config/db');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

module.exports = (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        console.log("Unauthorized!");
    }
    else{
        const token = authorization.replace("token ","")
        jwt.verify(token, JWT, (err, payload)=>{
            if(!err){
                const _id = payload
                Users.findById(_id).then(userData=>{
                    req.user = userData
                    next() 
                })
                   
            }
            else{
                console.log("User not signed in!");
                res.render('/')
            }
        })
    }
} 