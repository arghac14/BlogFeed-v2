import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import M from 'materialize-css';
import {Link} from 'react-router-dom';
import ApiService from '../api/apiService';
const { signup } = new ApiService();

function Signup() {
    const [fullName, setfullName] = useState("")
    const [userName, setuserName] = useState("")
    const [passWord, setpassWord] = useState("")
    const navigate = useNavigate()
    const postData = async (e)=>{
        var singupRequestData = {
            name: fullName,
            userName,
            password: passWord
        }
        var res = await signup(singupRequestData);
        if(res.id){
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            navigate("/");
        }
    }

    return (
        <div>
             
            <div className="neu card auth-card">
                    <h2 style={{color: "#ed6663"}}>BlogFeed</h2>
                    
                    <input required type="text" placeholder="Full Name" onChange={(e)=>setfullName(e.target.value)}/>
                    <input required type="text" placeholder="Username" onChange={(e)=>setuserName(e.target.value)}/>
                    <input required type="password" placeholder="Password" onChange={(e)=>setpassWord(e.target.value)}/>
                    <br/><button onClick={(e)=>postData(e)} className="btn primary-btn">Register</button>
                    <br/>
                    <span>Already have an account? <Link to="/signin">Sign In</Link></span>
                    <br/>
                    
                    
            </div>
        </div>
    )
}

export default Signup;
