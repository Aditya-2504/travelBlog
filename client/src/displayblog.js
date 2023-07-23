import React,{useState,useEffect,useRef} from 'react'
import {useNavigate,useParams } from 'react-router-dom';
import './userpage.css'
import './displayblog.css'
import UserHeader from './user_header';

//for pictures use cloudinary

function DisplayBlog(){
  const navigate=useNavigate();
  const {_id,_username,blog_id}=useParams();
  const curr_blog=useRef({});
  const is_Saved=useRef(false);
  const [complete,setComplete]=useState(false);
  useEffect(()=>{
    fetch(`https://travelogue-explore.herokuapp.com/routes/displayBlog?id=${blog_id}&userName=${_username}`)
    .then(res=>res.json())
    .then(res=>{
      if(res.msg==='Successfully received'){
        curr_blog.current=res.currBlog;
        is_Saved.current=res.isSaved;
        setComplete(true);
      }
      else{
        alert('The page does not exist.');
        setTimeout(navigate(-1),5000);
      }
    });
  },[]);

  function SaveBlog(){
    const [save_blog,setSaveBlog]=useState(is_Saved.current);
    function save_new_blog(){
      fetch(`https://travelogue-explore.herokuapp.com/routes/changeSaved?username=${_username}&status=true`,{
          method:"PATCH",
          body:JSON.stringify({
            heading:curr_blog.current.heading,
            sub:curr_blog.current.sub,
            blog_id:blog_id
          }),
          headers: {
            "Content-type":"application/json",
            "charset":"UTF-8"
          }
        }
      )
      .then(res=>res.json());
      setSaveBlog(true);
    }

    return(
      <>
        {save_blog && 
        <div className='save-blog'>
          <i>Saved</i>
        </div>
        }
        {!save_blog && 
        <div className='save-blog' onClick={()=>save_new_blog()}>
          <i>Save</i>
        </div>
        }
      </>
    )
  }

  return (
  <>
    {complete && <div className='view-blog'>    
      <UserHeader _user_name={_username} _id_={_id}/>
      <div className='blog-header'>
        <div className='heading-blog'>{curr_blog.current.heading}</div>
        <div className='sub-blog'>{curr_blog.current.sub}</div>
        <div className='author-blog'>
          <i>by {curr_blog.current.username}</i>
          <SaveBlog/>
        </div>
        <div className='content-blog'>{curr_blog.current.content}</div>
      </div>
    </div>}
  </>);
}

export default DisplayBlog;