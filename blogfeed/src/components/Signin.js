import React, {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

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
            dispatch(setUser(res.user));
            navigate("/");
            M.toast({html:`Hello ${res.user.userName}!`,classes:"#43a047 green darken-1"})
        }
    }


    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
    return JSON.parse(jsonPayload);
    };

    const responseMessage = async (response) => {
        const googleUserInfo = parseJwt(response.credential);
        console.log(googleUserInfo)
        let user = {}
        user.name = googleUserInfo.name;
        user.profilePhoto = googleUserInfo.picture;
        user.isGoogleAuth = true;
        user.userName = googleUserInfo.given_name.toLowerCase() + googleUserInfo.sub;
        user.googleAuthId = googleUserInfo.sub;
        var data = await signin(user);
        
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(setUser(data));
        navigate("/");
        M.toast({html:`Hello ${data.name}!`,classes:"#43a047 green darken-1"})
    };
    const errorMessage = (error) => {
        M.toast({ html: error, classes: '#c62828 red darken-3' });
    };

    return (
        <div className="neu card auth-card">
                <h2 style={{color: "#ed6663"}}>BlogFeed</h2>
                <input required type="text" placeholder="Username" onChange={(e)=>setuserName(e.target.value)}/>
                <input required type="password" placeholder="Password" onChange={(e)=>setpassWord(e.target.value)}/>
                <br/><button onClick={()=>signInUser()} style={{backgroundColor: "#ed6663", color:"whitesmoke"}} className="btn waves-effect waves-light">Submit</button>
                <br></br><div className='google-auth'><GoogleLogin onSuccess={responseMessage} onError={errorMessage} /></div>
                <br/>
                <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
        </div>
    )
}

export default Signin;
