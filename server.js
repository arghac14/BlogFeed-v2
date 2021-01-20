var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
const mongoose = require('mongoose');
const {MONGO_URI, JWT} = require('./config/db');
const jwt = require('jsonwebtoken');



require('./models/users');
require('./models/posts');
const Users = mongoose.model('Users')
const Posts = mongoose.model('Posts')

const requiredAuth = require('./middleware/authverify')

var app = express();

app.set("view engine","ejs");

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const {signUp, addPost} = require('./routes/auth') 

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('connected', ()=>{
    console.log("Database connected!");
})

db.on('error', (err)=>{
    console.log("Error occured!", err);
})

const middleWare = (req, res, next) => {
    console.log("MiddleWare!");
    next();
}

app.get('/', (req, res)=>{
    console.log("HOME!");
    Posts.find()
    .populate('author', "_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json(posts)
        console.log(posts)
    })
});

app.get('/addpost', requiredAuth, addPost)

app.post('/addpost', requiredAuth, (req, res)=>{
    const {title, tag, body, image} = req.body;
    console.log(req.body)
    var post = new Posts({
        title: title,
        tag: tag,
        body: body,
        image: image,
        author: req.user,
        date: new Date().toLocaleString()
    });
    
    post.save(function(err, story) {
        if (err) throw err;
        console.log('Post added successfully!');
        res.json(story)
    })
})

app.get('/user/:id', (req, res)=>{
    console.log(req.params.id)
    // Users.findOne({_id: req.params.id})
    // .select("-password")
    // .then(user=>{
    //     Posts.find({author:req.params.id})
    //     .populate("author", "_id name")
    //     .exec((err,posts)=>{
    //         if(err){
    //             return res.status(422).json({error: err})
    //         }
    //        console.log("User and posts:",{user,posts})
        
    //         res.json({user})
    //     })
    // }).catch(err=>{
    //     return res.status(404).json({error: "User not found"})
    // })
    
    Posts.find({author: req.params.id })
        .populate("author","_id name")
        .sort('-createdAt')
        .then(post=>{
           console.log(post[0].author.name)
            res.json({post, name: post[0].author.name})
        })
});

app.get('/post/:id', (req, res)=>{
    console.log(req.params.id)
    // Users.findOne({_id: req.params.id})
    // .select("-password")
    // .then(user=>{
    //     Posts.find({author:req.params.id})
    //     .populate("author", "_id name")
    //     .exec((err,posts)=>{
    //         if(err){
    //             return res.status(422).json({error: err})
    //         }
    //        console.log("User and posts:",{user,posts})
        
    //         res.json({user})
    //     })
    // }).catch(err=>{
    //     return res.status(404).json({error: "User not found"})
    // })
    
    Posts.findOne({_id: req.params.id })
        .populate("author","_id name")
        .then(post=>{
           console.log(post)
            res.json(post)
        })
});
app.post('/profile', (req, res)=>{
    console.log("My Posts!");
    //console.log(req.body.id)
    //console.log(req.params.username)
        Posts.find({author: req.body.id })
        .populate("author","id name")
        .sort('-createdAt')
        .then(post=>{
           // console.log(post)
            res.json(post)
        })

});



app.get('/signup', middleWare, signUp);

app.get('/signin', middleWare, (req, res)=>{
    console.log("Signin!");
});

app.post('/signin', (req, res)=>{
  //  console.log(req.body)
    Users.findOne({ username: req.body.userName, password: req.body.passWord },  function(err, users) {
        if (err) throw err;
        console.log(users);
        if(users){
            const token = jwt.sign({_id:users._id},JWT)
            const {_id,name,username,email} = users
            res.json({token,user:{_id,name,username,email}})
            console.log('Go to landing page with token:', token);
        }
        else{
            console.log("User doesn't exist")
        }
    });
})

app.post('/signup', (req, res)=>{
    console.log(req.body);
    var user = new Users({
        name: req.body.fullName,
        username: req.body.userName,
        email: req.body.email,
        password: req.body.passWord
    });
    
    
    Users.findOne({ username: req.body.userName, password: req.body.passWord },  function(err, users) {
        if (err) throw err;
        console.log(users);
        if(!users){
            user.save(function(err) {
                if (err) throw err;
                console.log('User saved successfully!');
                res.json({data:users, message:"success"})
                //const token = jwt.sign({_id: users._id}, JWT)
            });
        }
        else{
            console.log("User already exists!")
        }
    });
})

app.delete('/deletepost/:postId', requiredAuth,(req, res)=>{
    console.log(req.params.postId, req.user._id)
    Posts.findOne({_id: req.params.postId})
    .populate("author", "_id")
    .exec((err, post)=>{
        if(err || !post){
            return res.status(422).json({error: err})
        }
        if(post.author._id.toString() === req.user._id.toString()){
            console.log(post)
            post.remove()
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static('blogfeed/build'))
    const path = require('path')
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'blogfeed', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT)