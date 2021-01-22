import React,{useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {userContext} from '../App';
import {useParams} from 'react-router-dom';
import M from 'materialize-css';

function Post() {
    const [mypost, setPost] = useState([])
    const history = useHistory()
    const {postId} = useParams()
    const {state, dispatch} = useContext(userContext)

    useEffect(()=>{
        fetch(`/post/${postId}`,{
          method: "GET",
          headers:{
              "Content-Type":"application/json",
              "Authorization": "token " + localStorage.getItem("jwt")
          },
        })
        .then(res=>res.json())
        .then(result=>{
            if(result){
              console.log(result)
              setPost(result)
              //console.log(mypic)
          }
          else{
              M.toast({html: "Something went wrong!",classes:"#c62828 red darken-3"})
          }
        })
      },[])

      
    return (
        <div>
             <div className="post2-card post-neu center" style={{backgroundColor:"#ffd5cd"}} >
            <div className="container">
            <div className="row">
                <div className="card" style={{borderRadius: "20px 20px 20px 20px"}}>
                    <img className="card-img" style={{borderRadius: "20px 20px 0 0"}} src={mypost.image}alt="Bologna"/>
                    <div className="card-img-overlay">
                    </div>
                    <div className="card-body">
                    <h1 className="card-title" style={{fontWeight: "bold", fontSize: "50px"}}>{mypost.title}</h1>
                    <small className="text-muted cat" style={{fontSize: "20px"}}>
                        Posted on Oct 20, 12:45PM
                    </small>
                    <p className="card-text" style={{fontWeight: "lighter", fontSize: "30px"}}>{mypost.tag}</p>
                    
                    </div>
                    <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                        <div className="views postbig" style={{fontWeight: "lighter", fontSize: "18px", textAlign: "justify", textJustify: "inter-word"}}>
                            {mypost.body}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Post;
