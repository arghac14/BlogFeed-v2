import React, {useEffect, createContext, useReducer, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Feed from './components/Feed';
import Profile from './components/Profile';
import NotFoundPage from './components/NotFoundPage';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Post from './components/Post';
import AddPost from './components/AddPost';
import User from './components/User';
import {HashRouter, BrowserRouter, Route, Redirect, Switch, useHistory} from 'react-router-dom';
import {reducer, initialState} from './reducers/userReducer'
import 'font-awesome/css/font-awesome.min.css'

export const userContext = createContext()

const Routing=()=>{
  const history = useHistory()
  const {state, dispatch} = useContext(userContext)

  useEffect(()=>{
    var user = JSON.parse(localStorage.getItem("user"));
    //console.log(user)
    if(user){
      dispatch({type:"USER", payload: user})
      //history.push('/')
    }
    else{
      console.log("Anonymous!")
      //history.push('/signin')
    }
  },[])

  return(
    <div>
     
          <Switch>
              <Route exact path = '/' component = {()=><Feed/>}/>
              <Route exact path = '/signup' component = {()=><Signup/>}/>
              <Route exact path = '/signin' component = {()=><Signin/>}/>
              <Route exact path = '/' component = {()=><Feed/>}/>
              <Route exact path = '/profile' component = {()=><Profile/>}/>
              <Route path = '/user/:userId' component = {()=><User/>}/>
              <Route path = '/post/:postId' component = {()=><Post/>}/>
              <Route path = '/addpost' component = {()=><AddPost/>}/>
              {/* <Redirect to='/'/> */}
              <Route>
              <NotFoundPage />
              </Route>
          </Switch>
    </div>
  )}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <userContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
        <Navbar/><br></br><br></br><br></br><br></br>
          {/* <Footer/> */}
        <Routing/>
        </BrowserRouter>
     </userContext.Provider>
    
  );
}

export default App;
