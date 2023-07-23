import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import RegisterPage from './registerpage';
import UserPage from './userpage';
import VisitUser from './visit_user';
import AddBlog from './addblog';
import DisplayBlog from './displayblog';
function TravelBlog(){
  return (  
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/user/:_id/:_username" element={<UserPage/>}/> 
          <Route exact path="/user/:_id/:_username/:_visited_user" element={<VisitUser/>}/>   
          <Route exact path="/user/:_id/:_username/:status/addBlog" element={<AddBlog/>}/>
          <Route exact path="/blog/:_id/:_username/:blog_id" element={<DisplayBlog/>}/>
      </Routes>      
    </BrowserRouter>

  );
}
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<TravelBlog/>);