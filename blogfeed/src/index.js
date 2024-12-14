import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from'jquery';
import Popper from'popper.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from './App';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='801637736042-46ads4gait8bpd3l5jcdicvglf12aoa5.apps.googleusercontent.com'>
      <RouterProvider router={appRoutes}>
        <App />
      </RouterProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
