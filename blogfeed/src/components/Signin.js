import React, {useState, useContext} from 'react';
import Footer from './Footer'
import {useHistory} from 'react-router-dom'
import {userContext} from '../App';
import M from 'materialize-css';

function Signin() {
    const {state, dispatch} = useContext(userContext);
    const [userName, setuserName] = useState("")
    const [passWord, setpassWord] = useState("")
    const history = useHistory()
    const getData = ()=>{
        fetch("http://localhost:5000/signin",{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                userName,
                passWord
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log("token and users:",data)
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            dispatch({type: "USER", payload: data.user})
            M.toast({html:"Signed in!",classes:"#43a047 green darken-1"})
            history.push("/")
            
        })
        .catch(err=>{
            M.toast({html: "Invalid Credentials!",classes:"#c62828 red darken-3"})
            console.log(err)
        })
    }

    return (
        <div>
             {/* <Footer/> */}
            <div className="neu card auth-card">
                    <h2 style={{color: "#ed6663"}}>BlogFeed</h2>
                    <input type="text" placeholder="Username" onChange={(e)=>setuserName(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e)=>setpassWord(e.target.value)}/>
                    <br/><button onClick={()=>getData()} style={{backgroundColor: "#ed6663", color:"whitesmoke"}} className="btn waves-effect waves-light">Submit</button>
                    <br/>
                    <span>Don't have an account? <a href="/signup">Sign up</a></span>
                    <br/> 
            </div>
        </div>
    )
}

export default Signin;
