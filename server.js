var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

var app = express();

app.set("view engine","ejs");

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Use routes

app.get('/api/status', (req, res) => {
    res.status(200).json({"message":"BlogFeed API is up!"});
});

// Redirect '/' to '/api/status'
app.get('/', (req, res) => {
    res.redirect('/api/status');
});

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/', authRoutes);


if(process.env.NODE_ENV==="production"){
    app.use(express.static('blogfeed/build'))
    const path = require('path')
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'blogfeed', 'build', 'index.html'))
    })
}

const PORT = 5000;
app.listen(PORT)