import React,{useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {userContext} from '../App';
import {useParams} from 'react-router-dom';
import M from 'materialize-css';

function User() {
  const [mypic, setPics] = useState([])
  const [myname, setName] = useState('')

  const history = useHistory()
  const {userId} = useParams()
  const {state, dispatch} = useContext(userContext)
  //  var id = JSON.parse(localStorage.getItem('user'))._id
    useEffect(()=>{
      fetch(`/user/${userId}`,{
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": "token " + localStorage.getItem("jwt")
        },
      })
      .then(res=>res.json())
      .then(result=>{
          if(result){
            //console.log(mypic)
            setPics(result.post)
            setName(result.name)
            
            console.log(result)
        }
        else{
            M.toast({html: "Something went wrong!",classes:"#c62828 red darken-3"})
        }
      })
    },[])


    return (
    <div>
    
      <div style={{
          textAlign: "center",
          margin: "20px 0",
          borderBottom: "2px solid grey",
          borderRadius: "0 0 30px 30px",
          boxShadow: "5px 7px 5px grey"
      }}>
            <img class="neu" style={{width:"145px",height:"145px",borderRadius:"50%"}}
        src = {require("../assets/logo3.PNG")}/>
        <br></br><br></br>
        <h3>{myname}</h3>
        {/* <h4>{myusername}</h4> */}
       
         

      </div>
      <h2 className="center">User's feed:</h2>
      {   
           mypic.map(item=>{
             return (
                
              <div className="profile-feed" key={item._id} > 
              <div className="post-card" style={{backgroundColor:"#ffd5cd"}}>
                <div className="container">
                <div className="row">
                  
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    
                    <div className="card post-neu" style={{borderRadius: "20px 20px 20px 20px"}}>
                      
                      <img className="card-img" style={{borderRadius: "20px 20px 0 0"}} src={item.image?item.image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBggIBxIQEAcIDQoGCQkGEBIICg0NIB0iFhUdHx8YHiggGCYlGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKoAqgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABAUGAwIB/8QAMRAAAgECAgcHBAIDAAAAAAAAAAIDAVIEFAUREjIzkqITFSEicoLBNEJzsmKxIzHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJOAwlcVLq/1Gu8wEYGhXBQqurYp7/OespFYnKBnAaPKRWJyjKRWJygZwGjykVicoykVicoGcBo8pFYnKMpFYnKBnAaPKRWJyjKRWJygZwGjykVicoykVicoGcBo8pFYnKQdI6PVY2kgpq2d6MCqAAAAAAAALnQnBk9XwUxc6E4Enq+AI2mJWXErRa1ouynlQhdq11eYl6a+rX0IcsBhq4qXV/qNd5gOPatdXmHatdXmNBHhI0XUqU9TrtscMXo5JY2rFTZk+3Y3WApu1a6vMO1a6vMeGWqtstvKAPfatdXmHatdXmPAA99q11eYdq11eY8AD32rXV5h2rXV5jwAPfbNdXmNI3miba+5TMGnbhe0DMAAAAAAAAFzoTgSer4KYudCcCT1fAETTX1a+hCXoPV2El218ETTX1a+hDlgMXXCy7TeMbbygaEHKPExyrrRqEbF6QSBWoldqb7VTdArNI6s7Ns3EYM1WZmbxZt4AACdo/A1xLbb+EK9QHnAYGuJ87+EN1xyxeGbDSbD7v2tcaJVoq7K+Cruqc54VnjZHp5f1AzQO+LwzYaTYfd+1rjgANO3C9pmDTtwvaBmAAAAAAAAC50JwJPV8FMXOhOBJ6vgCJpr6tfxp8kEnaa+rX8af3UggAfVWrsqJTWzbql7gsCsEfnptSSb3/AKEE7SGBrhm208YW6Ro7A1nbtJfCL9gGj8DWdu1l8IV6i7VaKupfBVCrRV1L4Kp9AAADlPCs8bI9PL+pQ4vDNhpNh937WuNGcp4VnjZHp5f1AzRp24XtMwaduF7QMwAAAAAAAAXOhOBJ6vgpi50JwJPV8ARNNfVr+NP7qQlWrsqJTWzbqk3TX1a/jT+6kvQsS9k0mr/JtbG1/EDrgMFTDLrbxmbea0mAAfGWjLst4q28oVaKupfBVPoAAAAAAAAAyrbxp24XtMw28aduF7QMwAAAAAAAAXOhOBJ6vgpi50G3+KSn8gImmvq1/Gn91O+i8THFhtUrUo20/lGlMNJLOrxLrXZ2CHkZrK9IFznob1GehvUpsjNZXpGRmsr0gXOehvUZ6G9SmyM1lekZGayvSBc56G9Rnob1KbIzWV6RkZrK9IFznob1GehvUpsjNZXpGRmsr0gXOehvUZ6G9SmyM1lekZGayoEY07cL2lDkZrKl9J5YW2vtUDMAAAAAAAAHfCYpsLLtr4q28pwAF4uk4WXW1a0a11PXeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WHeMF3SxQgC+7xgu6WIeP0j2sbRweEbbzP9xWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="} alt="Bologna"/>
                      
                      <div className="card-body">
                      
                        <h4 className="card-title">{item.title}</h4>
                        <small className="text-muted cat">
                          Posted by <a href="">{item.author.name}</a>
                        </small>
                        <p className="card-text">{item.tag}</p>
                        
                        <a href = {'/post/'+item._id}  style={{backgroundColor: "#ed6663" ,color: "whitesmoke", border: "none"}} class="btn-neu btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp; See full story</a>&nbsp;&nbsp;
                      
                      </div>
                        <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                          <div className="views">
                            {item.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
      
             )
           })
      }
    
      </div>
       
)
}

export default User;
