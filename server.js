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

app.get('/feed', (req, res)=>{
    console.log("HOME!");
   // console.log(req,res)
    Posts.find()
    .populate("author", "_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json(posts)
        console.log(posts)
    })
});


app.get('/user/:id', (req, res)=>{
    console.log("User's feed")
    Posts.find({author: req.params.id })
        .populate("author","_id name")
        .sort('-createdAt')
        .then(post=>{
           console.log(post)
            res.json({post, name: post[0].author.name})
        })
});

app.get('/post/:id', (req, res)=>{
    console.log(req.params.id) 
    console.log("Post: '/post/:id'");
    Posts.findOne({_id: req.params.id })
        .populate("author","_id name")
        .then(post=>{
           console.log(post)
            res.json(post)
        })
});


app.get('/addpost', requiredAuth, addPost)

app.post('/addpost', requiredAuth, (req, res)=>{
    console.log("Addpost-server")
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


app.post('/profile', (req, res)=>{
    console.log("My Poss! '/profile'");
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
   console.log(req.body.userName.length)
//    if(req.body.userName.length==0 || req.body.passWord.length==0 ){
//         return res.status(422).json({
//             error: "Please Enter all credentials!"
//         });
//    }

    Users.findOne({ username: req.body.userName, password: req.body.passWord },  function(err, users) {
        //if (err) throw err;
        console.log(users);



        if(users){
            const token = jwt.sign({_id:users._id},JWT)
            const {_id,name,username,email} = users
            res.json({token,user:{_id,name,username,email}})
            console.log('Go to landing page with token:', token);
        }
        
        else if(req.body.userName.length==0 || req.body.passWord.length==0 ){
            return res.status(422).json({
                error: "Please Enter all credentials!"
            });
         }
    
        else{
           // throw err;
            console.log("User doesn't exist");
            return res.status(422).json({
                error: "Invalid credentials!"
            });  
        }
    });
})

app.post('/signup', (req, res)=>{
    console.log(req.body);
    
    if(req.body.fullName.length ==0 || req.body.userName.length==0 || req.body.email.length==0 || req.body.passWord.length==0){
        return res.status(422).json({
            error: "Please Enter all credentials!"
        });
    }
    if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(req.body.email)){
        return res.status(422).json({
            error: "Enter a valid email!"
        });
    }
    if(req.body.passWord.length < 6){
        return res.status(422).json({
            error: "Password should be atleast 6 characters long!"
        });
    }
    if(req.body.userName.length > 20 || req.body.userName.length < 2){
        return res.status(422).json({
            error: "User name must be within 2 to 10 characters."
        });
    }

    var user = new Users({
        name: req.body.fullName,
        username: req.body.userName,
        email: req.body.email,
        password: req.body.passWord
    });
    
    
    Users.findOne({ username: req.body.userName, password: req.body.passWord },  function(err, users) {
       // if (err) throw err;
        console.log(users);
        if(users){
            return res.status(422).json({
                error: "User already exists!"
            });
            
        }
       
        else {
            user.save(function(err) {
                if (err) throw err;
                console.log('User saved successfully!');
                res.json({data:users, message:"success"})
                //const token = jwt.sign({_id: users._id}, JWT)
            });
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