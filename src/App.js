import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Movies from './components/Movies/Movies.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Notfound from './components/Notfound/Notfound.jsx';
import Layout from './components/Layout/Layout.jsx';
import Protected from './components/Protected/Protected.jsx';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Review from './components/Review/Review.jsx';
import Person from './components/Person/Person.jsx';
import PersonInf from './components/PersonInf/PersonInf.jsx';
import Upcoming from './components/Upcoming/Upcoming.jsx';
import FavoriteList from './components/FavoriteList/FavoriteList.jsx';
import WatchList from './components/WatchList/WatchList.jsx';
import Search from './components/Search/Search.jsx';



function App() {

let[user,setUser]=useState(null)
function getUser(){
  let token =localStorage.getItem('token')
  let usr =jwtDecode(token)
  setUser(usr)
}
useEffect(()=>{
  if(localStorage.getItem('token')){
    getUser()
  }
},[])


  const routes = createBrowserRouter([
    {
      path:'', element: <Layout user={user} setUser={setUser} />,children:[
       {index:true,element:<Home />},
       {path:'movie',element:<Protected><Movies/></Protected> },
       {path:'login',element:<Login getUser={getUser}/>},
       {path:'register',element:<Register/>},
       {path:'person',element:<Protected><Person/></Protected>},
       {path:'upcoming',element:<Protected><Upcoming/></Protected>},
       {path:'review/:movieId',element:<Protected><Review/></Protected> },
       {path:'personInf/:personId',element:<Protected><PersonInf/></Protected> },
       {path:'favoriteList',element:<Protected><FavoriteList/></Protected> },
       {path:'watchList',element:<Protected><WatchList/></Protected> },
       {path:'search',element:<Protected><Search/></Protected> },
       {path:"*", element: <Notfound/>}
      ]
    }
  ])
  return (
   <>
   
   <RouterProvider router={routes}>
   </RouterProvider>
   
   </>
  );
}

export default App;
