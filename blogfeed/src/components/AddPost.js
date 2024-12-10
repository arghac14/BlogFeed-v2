import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import M from 'materialize-css';
import ApiService from '../api/apiService';
import { useSelector } from 'react-redux';

const { createPost } = new ApiService();

function AddPost() {
    const navigate = useNavigate();
    var user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        M.toast({html: "You need to have an account first!",classes:"#c62828 red darken-3"})
        navigate('/signin')
    }
    const [title, setTitle] = useState("")
    const [tag, setTag] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    const currentUser = useSelector((state) => state.user.user);
    const areAllFieldsFilled = () =>{
        if(!title || !tag || !body || !image){
            return false;
        }
        return true;
    }

    const createBlogPost = async () => {
        try{
            var blogRequestData = {
                title,
                tag,
                content: body,
                coverPhoto: imgUrl,
                userId: currentUser.id,
                createdAt: new Date().toISOString()
            }
            await createPost(blogRequestData);
            M.toast({html:"Post created successfully!",classes:"#43a047 green darken-1"})
            navigate("/profile");
        }
        catch(ex){
            M.toast({html: "Something went wrong!",classes:"#c62828 red darken-3"})
        }
    }

    useEffect(() =>{       
        if(imgUrl){
            createBlogPost();
        }
      
    }, [imgUrl]);
    
    const addPost = async(e) =>{
        if(!areAllFieldsFilled()){
            M.toast({html: "Please add all the fields", classes:"#c62828 red darken-3"});
            return;
        }
        var formdata = new FormData();

        formdata.append("file", image);
        formdata.append("cloud_name", "arghac14");
        formdata.append("upload_preset", "blogfeed");


        var uploadedResponse = await fetch("https://api.cloudinary.com/v1_1/arghac14/auto/upload", 
            {
                method: "post",
                mode: "cors",
                body: formdata
            });
        
        if (uploadedResponse.ok) {
            const data = await uploadedResponse.json();
            console.log(data.url)
            setImgUrl(data.url); 
        }
        else{
            M.toast({html: "Something went wrong!",classes:"#c62828 red darken-3"})
        }
}


return (
    <div>
         <div className="neu card post-card" >
                <h2 style={{color: "#ed6663"}}>Create a post</h2>
                <input required type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Title" maxLength = "30"/>
                <input required type="text" onChange={(e)=>setTag(e.target.value)} placeholder="Tagline" maxLength = "90"/><br></br>
                {/* <label for="files" style={{backgroundColor: "#ed6663", color:"whitesmoke"}} className="btn-neu btn waves-effect waves-light">Select Image</label> */}
                <input id="filesFor" style={{visibility:"visible"}} required type="file" onChange={(e)=>setImage(e.target.files[0])} placeholder="Add cover image: "></input><br></br>
                <textarea required  className="btn-neu" maxLength="4000" onChange={(e)=>setBody(e.target.value)} placeholder=" Share your story here..
                Note: Markup supported!" style={{height: "400px", fontSize:"20px"}} maxLength = "5000" rows="100" cols="100"></textarea>
                    
                <br/><br/><button onClick={()=>addPost()} style={{backgroundColor: "#ed6663", color:"whitesmoke"}} className="btn-neu btn waves-effect waves-light">Submit</button>
                <br/>
        </div>
    </div>
)
}

export default AddPost