import React from 'react';
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
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css'
import { Provider } from 'react-redux';
import store from '../src/store';

const App = () => {
  return (
    <div className='app'>
      <Provider store={store}>
        <Navbar/>
          <div className='app-body'>
            <Outlet />
          </div>
          <Footer/>
      </Provider>
    </div>
  );
}

export const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      { path: '/', element: <Feed /> },
      { path: '/profile', element: <Profile /> },
      { path: '/signup', element: <Signup /> },
      { path: '/signin', element: <Signin /> },
      { path: '/post/:id', element: <Post /> },
      { path: '/add-post', element: <AddPost /> },
    ]
  },
  { 
    path: '*',
    element: <NotFoundPage /> 
  }
]);

export default App;