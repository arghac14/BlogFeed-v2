import React, {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

function AddPost() {
    const history = useHistory();
    var user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        M.toast({html: "You need to have an account first!",classes:"#c62828 red darken-3"})
      history.push('/signin')
    }
    const [title, setTitle] = useState("")
    const [tag, setTag] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")


    useEffect(()=>{
        if(url){
            fetch("http://localhost:5000/addpost",{
                method: "post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "token " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title: title,
                    tag: tag,
                    body: body,
                    image: url
                })
            }).then(res=>res.json())
            .then(data=>{
                M.toast({html:"Post created successfully!",classes:"#43a047 green darken-1"})
                console.log(data)
                history.push("/profile")
                
            })
            .catch(err=>{
                M.toast({html: "Something went wrong!",classes:"#c62828 red darken-3"})
                console.log(err)
            })
        }
    },[url]) 
    
    const addPost =(e)=>{
        M.toast({html: "This may take few seconds..", classes:"yellow"})
        //console.log(image)
        var formdata = new FormData();

        formdata.append("file", image);
        formdata.append("cloud_name", "arghac14");
        formdata.append("upload_preset", "blogfeed");

        let res = fetch(
        "https://api.cloudinary.com/v1_1/arghac14/auto/upload",
        {
            method: "post",
            mode: "cors",
            body: formdata
        }
        )
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUrl(data.url)
        })
        .catch(err=>{
            M.Toast({html: "Missing required parameter!",classes:"#c62828 red darken-3"})
            console.log(err)
        })

      
}


return (
    <div>
         <div className="neu card post-card" >
                <h2 style={{color: "#ed6663"}}>Create a post</h2>
                <input required type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Title" maxLength = "30"/>
                <input required type="text" onChange={(e)=>setTag(e.target.value)} placeholder="Tagline" maxLength = "90"/><br></br>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} placeholder="Add cover image: "></input><br></br>
                <textarea className="btn-neu" maxLength="4000" onChange={(e)=>setBody(e.target.value)} placeholder="Share your story here.." style={{height: "500px", fontSize:"20px"}} required maxlength = "5000" rows="100" cols="100"></textarea>
                <br/><br/><button onClick={()=>addPost()} style={{backgroundColor: "#ed6663", color:"whitesmoke"}} className="btn-neu btn waves-effect waves-light">Submit</button>
                <br/>
        </div>
    </div>
)
}

export default AddPost