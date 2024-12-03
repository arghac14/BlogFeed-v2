import React, {useContext} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import 'font-awesome/css/font-awesome.min.css'
const Navbar = ()=> {
    const navigate = useNavigate()
    const renderList=()=>{
      if(!true){ 
        return [
          // <li><Link to="/feed"><i class="fa fa-rss"></i>&nbsp; Feed</Link></li>,
          <li><Link to="/signin"><i class="fa fa-sign-out"></i>&nbsp; Sign In</Link></li>,
          <li><Link to="/signup"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp; Sign Up</Link></li>
        ]
      }
      else{
        return [
          <li><Link to="/"><i class="fa fa-rss" aria-hidden="true"></i>&nbsp; Feed</Link></li>,
          <li><Link to="/add-post"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp; Create Post</Link></li>,
          <li><Link to="/profile"><i className="fa fa-user" aria-hidden="true"></i>&nbsp; My Feed</Link></li>,
          <li><Link to="#" onClick={()=>{
              localStorage.clear();
              
              navigate('/signin')
          }} ><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Log Out</Link></li>
        ]
      }
    }
    
    return (
        <div>
            <header class="header">
              <span className="logo"><img style={{width:"45px",height:"45px",borderRadius:"50%"}}
                    src = {require("../assets/logo1.PNG")}/></span>
              <input className="menu-btn" type="checkbox" id="menu-btn" />
              <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
              <ul class="menu">
              {renderList()}
              </ul>
            </header>
    
        </div>
    )
    
}
export default Navbar
