var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set("view engine","ejs");
app.use(express.static(__dirname+"/assets"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const middleWare = (req, res, next) => {
    console.log("MiddleWare!");
    next();
}

app.get('/', (req, res)=>{
    console.log("HOME!");
});

app.get('/addpost', middleWare, (req, res)=>{
    console.log("Add post!");
});



const PORT = process.env.PORT || 3000;
app.listen(PORT)