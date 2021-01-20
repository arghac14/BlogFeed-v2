module.exports = {
    signUp: function(req, res){
        res.render('signup.ejs')
    },

    addPost: (req, res)=>{
        res.render('addpost.ejs')
    }
}