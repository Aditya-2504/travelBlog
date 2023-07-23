import React,{useState,useEffect,useRef} from 'react'
import {useNavigate,useParams } from 'react-router-dom';
import UserHeader from './user_header';
import './userpage.css'
import ViewBlogs from './view_blogs';

//for pictures use cloudinary

function UserPage(){
  const navigate=useNavigate();
  const {_id,_username}=useParams();
  const status='true';
  const user_blogs=useRef([]);
  const saved_blogs=useRef([]);
  const [complete,setComplete]=useState(false);
  const [completeUser,setCompleteUser]=useState(false);
  useEffect(()=>{
    fetch(`https://travelogue-explore.herokuapp.com/routes/getBlogs?userName=${_username}`)
    .then(res=>res.json())
    .then(res=>{
      if(res.msg==='Successfully received'){
        user_blogs.current=res.list_of_blogs;
        setCompleteUser(true);
      }
      else{
        alert('Something went wrong. Please reload.');
      }
    });
    fetch(`https://travelogue-explore.herokuapp.com/routes/getSavedBlogs?userName=${_username}`)
    .then(res=>res.json())
    .then(res=>{
      if(res.msg==='Successfully received'){
        saved_blogs.current=res.list_of_blogs;
        setComplete(true);
      }
      else{
        alert('Something went wrong. Please reload.');
      }
    });
  },[]);

  function UserOptions(){
    const [myBlogs,setMyBlogs]=useState(true);
    const [saved,setSaved]=useState(false);
    const [currBlogs,setCurrBlogs]=useState(user_blogs.current);
    return(
    <>
      <div className='user-options'>
        <div className='user-options-header'>
          {myBlogs &&
          <>
            <div className='my-blogs-active'>My Blogs</div>
            <div className='saved-blogs' onClick={()=>{setSaved(saved=>!saved);
                                    setMyBlogs(myBlogs=>!myBlogs);setCurrBlogs(saved_blogs.current)}}>Saved Blogs</div>
            <div className='add-blog' onClick={()=>navigate(`/user/${_id}/${_username}/${status}/addBlog`)}>Add Blog</div>
          </>}

          {saved &&
          <>
            <div className='my-blogs' onClick={()=>{setSaved(saved=>!saved);setMyBlogs(myBlogs=>!myBlogs);
                                                  setCurrBlogs(user_blogs.current)}}>My Blogs</div>
            <div className='saved-blogs-active'>Saved Blogs</div>
          </>}
        </div>
      </div>
      {complete && <div className='list-of-blogs'><ViewBlogs _user_name={_username} _user_id={_id} original_user={_username} 
            userBlogs={myBlogs} savedShow={saved} visitorShow={false} listOfBlogs={currBlogs}
            changeSaved={(newSavedBlogs)=>{saved_blogs.current=newSavedBlogs;setCurrBlogs(saved_blogs.current);}}
            deleteBlog={(newSavedBlogs)=>{user_blogs.current=newSavedBlogs;setCurrBlogs(user_blogs.current);}}/></div>}
    </>
    );
  }

  return (
  <>
    <div className='user'>    
      <UserHeader _user_name={_username} _id_={_id}/>
      {complete && <UserOptions/>}
      {!complete && <div>Please reload</div>}
    </div>
  </>);
}

export default UserPage;