import React from 'react';
import {Link} from 'react-router-dom';
import {useEffect, createContext, useReducer, useContext} from 'react';
import {HashRouter, BrowserRouter, Route, Redirect, Switch, useHistory} from 'react-router-dom';




const NotFoundPage = ()=>{
    const history = useHistory()
    return(
        <div className="box-layout center">
            <div className="box-layout-box">
                <h1 className="box-layout-title">Error: 404!</h1>
                <h4>Page Not Found.</h4><br/>
            </div>
        </div>
    )
};

export default NotFoundPage;