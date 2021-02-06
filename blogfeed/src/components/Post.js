import React,{useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {userContext} from '../App';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import M from 'materialize-css';
import ReactHtmlParser from 'react-html-parser'; 

function Post() {
    const [mypost, setPost] = useState([])
    const [writer, setWriter] = useState([])
    const [id, setId] = useState([])
    const history = useHistory()
    const {postId} = useParams()
    const {state, dispatch} = useContext(userContext)

    useEffect(()=>{
        console.log("Post.js")
        fetch(`/blog/${postId}`,{
          //method: "GET",
          headers:{
            // "Content-Type":"application/json",
              "Authorization": "token " + localStorage.getItem("jwt")
          },
        })
        
        .then(res=>res.json())
        .then(result=>{
            //console.log("Here")
            if(result){
              console.log("Here's the post:",result.author._id)
              setWriter(result.author.name)
              setId(result.author._id)
              setPost(result)
              //console.log(mypost)
              //console.log(mypic)
          }
            else{
                console.log("wrong")
              M.toast({html: "Something went wrong!",classes:"#c62828 red darken-3"})
              }
        })
        .catch(e=>console.log(e))
      },[])

      
    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> 
             <div className="post2-card  center" style={{backgroundColor:"#ffd5cd"}} >
            <div className="container">
            <div className="row">
                <div className="card post-neu" style={{borderRadius: "20px 20px 20px 20px"}}>
                    <img className="card-img" style={{maxHeight:"450px",borderRadius: "20px 20px 0 0"}} src={mypost.image?mypost.image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBggIBxIQEAcIDQoGCQkGEBIICg0NIB0iFhUdHx8YHiggGCYlGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKoAqgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABAUGAwIB/8QAMRAAAgECAgcHBAIDAAAAAAAAAAIDAVIEFAUREjIzkqITFSEicoLBNEJzsmKxIzHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJOAwlcVLq/1Gu8wEYGhXBQqurYp7/OespFYnKBnAaPKRWJyjKRWJygZwGjykVicoykVicoGcBo8pFYnKMpFYnKBnAaPKRWJyjKRWJygZwGjykVicoykVicoGcBo8pFYnKQdI6PVY2kgpq2d6MCqAAAAAAAALnQnBk9XwUxc6E4Enq+AI2mJWXErRa1ouynlQhdq11eYl6a+rX0IcsBhq4qXV/qNd5gOPatdXmHatdXmNBHhI0XUqU9TrtscMXo5JY2rFTZk+3Y3WApu1a6vMO1a6vMeGWqtstvKAPfatdXmHatdXmPAA99q11eYdq11eY8AD32rXV5h2rXV5jwAPfbNdXmNI3miba+5TMGnbhe0DMAAAAAAAAFzoTgSer4KYudCcCT1fAETTX1a+hCXoPV2El218ETTX1a+hDlgMXXCy7TeMbbygaEHKPExyrrRqEbF6QSBWoldqb7VTdArNI6s7Ns3EYM1WZmbxZt4AACdo/A1xLbb+EK9QHnAYGuJ87+EN1xyxeGbDSbD7v2tcaJVoq7K+Cruqc54VnjZHp5f1AzQO+LwzYaTYfd+1rjgANO3C9pmDTtwvaBmAAAAAAAAC50JwJPV8FMXOhOBJ6vgCJpr6tfxp8kEnaa+rX8af3UggAfVWrsqJTWzbql7gsCsEfnptSSb3/AKEE7SGBrhm208YW6Ro7A1nbtJfCL9gGj8DWdu1l8IV6i7VaKupfBVCrRV1L4Kp9AAADlPCs8bI9PL+pQ4vDNhpNh937WuNGcp4VnjZHp5f1AzRp24XtMwaduF7QMwAAAAAAAAXOhOBJ6vgpi50JwJPV8ARNNfVr+NP7qQlWrsqJTWzbqk3TX1a/jT+6kvQsS9k0mr/JtbG1/EDrgMFTDLrbxmbea0mAAfGWjLst4q28oVaKupfBVPoAAAAAAAAAyrbxp24XtMw28aduF7QMwAAAAAAAAXOhOBJ6vgpi50G3+KSn8gImmvq1/Gn91O+i8THFhtUrUo20/lGlMNJLOrxLrXZ2CHkZrK9IFznob1GehvUpsjNZXpGRmsr0gXOehvUZ6G9SmyM1lekZGayvSBc56G9Rnob1KbIzWV6RkZrK9IFznob1GehvUpsjNZXpGRmsr0gXOehvUZ6G9SmyM1lekZGayoEY07cL2lDkZrKl9J5YW2vtUDMAAAAAAAAHfCYpsLLtr4q28pwAF4uk4WXW1a0a11PXeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WIeP0j2sbRweEbbzP9xWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="} alt="Loading.."/>
                    
                    <div className="card-body">
                    <h1 className="card-title" style={{fontWeight: "bold", fontSize: "50px"}}>{mypost.title}</h1>
                    <small className="text-muted cat" style={{fontSize: "20px"}}>
                        Posted on {mypost.date}
                    </small><br></br>
                    <small className="text-muted cat">
                          By <Link to={'/user/'+id}>{writer}</Link>
                    </small>
                    

                    {/* <div> { ReactHtmlParser ("<h1>Hello</h1>") } </div> */}
                    <p className="card-text" style={{fontWeight: "lighter", fontSize: "30px"}}>{mypost.tag}</p>
                    
                    </div>
                    <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                        <div className="views postbig" style={{fontSize: "18px", textAlign: "justify", textJustify: "auto"}}>
                            <div> { ReactHtmlParser (mypost.body)}</div>
                        </div>
                    </div>
                    
                    </div>
                    {/* <small className="text-muted cat">
                       <span>&nbsp;&nbsp;By <Link to={'/user/'+id}>{writer}</Link></span>
                    </small> */}
                </div>
                
            </div>
        </div>
        
        </div>
    )
}

export default Post;
