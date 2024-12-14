import React, {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom'
import M from 'materialize-css';
import ApiService from '../api/apiService';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
const { signin } = new ApiService();

function Signin() {
    const [userName, setuserName] = useState("")
    const [passWord, setpassWord] = useState("")
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const signInUser = async (e)=>{
        var signinRequestData = {
            userName,
            password: passWord
        }
        var res = await signin(signinRequestData);
        
        if(res.user){
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('user', JSON.stringify(res.user));
            console.log(res)
            dispatch(setUser(res.user));
            navigate("/");
            M.toast({html:`Hello ${res.user.userName}!`,classes:"#43a047 green darken-1"})
        }
    }

    return (
        <div className="neu card auth-card">
                <h2 style={{color: "#ed6663"}}>BlogFeed</h2>
                <input required type="text" placeholder="Username" onChange={(e)=>setuserName(e.target.value)}/>
                <input required type="password" placeholder="Password" onChange={(e)=>setpassWord(e.target.value)}/>
                <br/><button onClick={()=>signInUser()} style={{backgroundColor: "#ed6663", color:"whitesmoke"}} className="btn waves-effect waves-light">Submit</button>
                <br/>
                <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                <br/> 
        </div>
    )
}

export default Signin;
