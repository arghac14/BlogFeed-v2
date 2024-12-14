import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import ApiService from '../api/apiService';

const { getPosts, getUser } = new ApiService();

function Feed() {
  const [blogs, setBlogs] = useState([]);
  const getUserPosts = async() => {
    const posts = await getPosts();
    // Start with an empty array to store processed posts
    const postsWithUsernames = [];

    for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const user = await getUser(parseInt(post.userId));
    const userName = user.userName;
    // Add the post with userName
    postsWithUsernames.push({ ...post, userName });
    // Update state after processing each post
    setBlogs((prevBlogs) => [...prevBlogs, { ...post, userName }]);
    }
  }

  useEffect(() => {
    getUserPosts();
  }, []);
    
    return (
        
    <div>
    <div style={{
          textAlign: "center",
          margin: "40px 0",
          backgroundColor: "#ffd5cd",
          borderBottom: "2px solid grey",
          borderRadius: "0 0 30px 30px",
          boxShadow: "6px 8px 6px grey"
      }}>
            <img class="neu" style={{width:"145px",height:"145px",borderRadius:"50%"}}
        src = {require("../assets/logo1.PNG")}/>
        <br></br><br></br>
       <h1>BlogFeed</h1>
       <h3>A blogging site <i style={{textDecoration: "none", color: "#ED6663"}} class="fa fa-pencil" aria-hidden="true"></i></h3>
       <hr></hr> <h6>Made with <span style={{color: "red"}}>&#10084;</span> by &nbsp;<a style={{textDecoration: "none", color: "rgb(237,102,99)", textShadow: "2px"}} href="https://arghac14.github.io">@arghac14</a></h6>
      </div>
    
    <div className="gen-feed" >
      <div className="container">
        <div className="row">
        {   
            blogs.map(item=>{
              return (        
                <div className="post-card" key={item.id} style={{backgroundColor:"#ffd5cd"}}>

                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            
                    <div className="post-neu card" style={{borderRadius: "20px 20px 20px 20px"}}>
                      
                      <img className="card-img" style={{maxHeight:"230px", borderRadius:" 20px 20px 0px 0px"}} src={item.coverPhoto ? item.coverPhoto :"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBggIBxIQEAcIDQoGCQkGEBIICg0NIB0iFhUdHx8YHiggGCYlGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKoAqgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABAUGAwIB/8QAMRAAAgECAgcHBAIDAAAAAAAAAAIDAVIEFAUREjIzkqITFSEicoLBNEJzsmKxIzHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJOAwlcVLq/1Gu8wEYGhXBQqurYp7/OespFYnKBnAaPKRWJyjKRWJygZwGjykVicoykVicoGcBo8pFYnKMpFYnKBnAaPKRWJyjKRWJygZwGjykVicoykVicoGcBo8pFYnKQdI6PVY2kgpq2d6MCqAAAAAAAALnQnBk9XwUxc6E4Enq+AI2mJWXErRa1ouynlQhdq11eYl6a+rX0IcsBhq4qXV/qNd5gOPatdXmHatdXmNBHhI0XUqU9TrtscMXo5JY2rFTZk+3Y3WApu1a6vMO1a6vMeGWqtstvKAPfatdXmHatdXmPAA99q11eYdq11eY8AD32rXV5h2rXV5jwAPfbNdXmNI3miba+5TMGnbhe0DMAAAAAAAAFzoTgSer4KYudCcCT1fAETTX1a+hCXoPV2El218ETTX1a+hDlgMXXCy7TeMbbygaEHKPExyrrRqEbF6QSBWoldqb7VTdArNI6s7Ns3EYM1WZmbxZt4AACdo/A1xLbb+EK9QHnAYGuJ87+EN1xyxeGbDSbD7v2tcaJVoq7K+Cruqc54VnjZHp5f1AzQO+LwzYaTYfd+1rjgANO3C9pmDTtwvaBmAAAAAAAAC50JwJPV8FMXOhOBJ6vgCJpr6tfxp8kEnaa+rX8af3UggAfVWrsqJTWzbql7gsCsEfnptSSb3/AKEE7SGBrhm208YW6Ro7A1nbtJfCL9gGj8DWdu1l8IV6i7VaKupfBVCrRV1L4Kp9AAADlPCs8bI9PL+pQ4vDNhpNh937WuNGcp4VnjZHp5f1AzRp24XtMwaduF7QMwAAAAAAAAXOhOBJ6vgpi50JwJPV8ARNNfVr+NP7qQlWrsqJTWzbqk3TX1a/jT+6kvQsS9k0mr/JtbG1/EDrgMFTDLrbxmbea0mAAfGWjLst4q28oVaKupfBVPoAAAAAAAAAyrbxp24XtMw28aduF7QMwAAAAAAAAXOhOBJ6vgpi50G3+KSn8gImmvq1/Gn91O+i8THFhtUrUo20/lGlMNJLOrxLrXZ2CHkZrK9IFznob1GehvUpsjNZXpGRmsr0gXOehvUZ6G9SmyM1lekZGayvSBc56G9Rnob1KbIzWV6RkZrK9IFznob1GehvUpsjNZXpGRmsr0gXOehvUZ6G9SmyM1lekZGayoEY07cL2lDkZrKl9J5YW2vtUDMAAAAAAAAHfCYpsLLtr4q28pwAF4uk4WXW1a0a11PXeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WIeP0j2sbRweEbbzP9xWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="} alt="Loading.."/>
                      
                      <div className="card-body">
                      
                        <h4 className="card-title">{item.title}</h4>
                        <small className="text-muted cat">
                          Posted by <Link to={'/profile/'+item.userId}>{item.userName} </Link>
                        </small>
                        <p className="card-text">{item.tag}</p>
                        <small className="text-muted cat">
                        <Link to={'/post/'+item.id}><a href = {'/post/'+item.id} style={{backgroundColor: "#ed6663", color: "whitesmoke", border: "none"}} class="btn-neu btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp; See full story</a></Link>
                          
                        </small>
                      <br></br>
                        {/* {(item.author._id === state._id)
                        && <a style={{backgroundColor: "#ed6663", color: "whitesmoke", border: "none"}} class="btn-neu btn btn-danger" onClick={()=>deletePost(item._id)}><i class="fa fa-trash" aria-hidden="true"></i> delete</a>                  
                        }   */}
                      </div>
                        <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                          <div className="views">
                          <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp; {item.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              )
            })
        } 
        </div>
      </div>
    </div>
  </div>   
)
}

export default Feed;
