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
import GuardedRoute from './GlobalRouterGuard'; 

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
      { path: '/', element: <GuardedRoute><Feed /></GuardedRoute> },
      { 
        path: '/profile', 
        element: <GuardedRoute needsAuth={true}><Profile/></GuardedRoute>
      },
      { 
        path: '/profile/:userId', 
        element: <GuardedRoute needsAuth={true}><User/></GuardedRoute>
      },
      { path: '/signup', element: <Signup /> },
      
      { path: '/signin', element: <Signin /> },
      { path: '/post/:postId', element: <GuardedRoute needsAuth={true}><Post /></GuardedRoute> },
      { path: '/add-post', element: <GuardedRoute needsAuth={true}><AddPost /></GuardedRoute> },
    ]
  },
  { 
    path: '*',
    element: <NotFoundPage /> 
  }
]);

export default App;