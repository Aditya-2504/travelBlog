import React,{useState} from 'react'
import Drop_down from './images/drop-down.jpg';
import {useNavigate} from 'react-router-dom';
import './view_blogs.css'

//for pictures use cloudinary

function ViewBlogs(props){
  const navigate=useNavigate();
  const user_id=props._user_id;
  const status='false';
  const original_user=props.original_user;
  function removeSavedBlog(removeId,removeHeading,removeSub){
    const newSaved=props.listOfBlogs.filter(blog=>blog.blog_id!==removeId);
    fetch(`https://travelogue-explore.herokuapp.com/routes/changeSaved?username=${original_user}&status=false`,{
      method:"PATCH",
        body:JSON.stringify({
          heading:removeHeading,
          sub:removeSub,
          blog_id:removeId
        }),
        headers: {
          "Content-type":"application/json",
          "charset":"UTF-8"
        }
      }
    )
    .then(res=>res.json());
    props.changeSaved(newSaved);
  }

  function deleteUserBlog(removeId){
    const newUserBlogs=props.listOfBlogs.filter(blog=>blog._id!==removeId);
    fetch(`https://travelogue-explore.herokuapp.com/routes/deleteBlog?username=${original_user}&id=${removeId}`,{
      method:"DELETE"
    })
    .then(res=>res.json());
    props.deleteBlog(newUserBlogs);
  }

  function DisplayBlog(props){
    const [openDesc,setOpenDesc]=useState(false);
    return(
    <>
      <div className='blog-grid'>
        <div className='drop-down'>
          <img src={Drop_down} id='drop-down-image' onClick={()=>setOpenDesc(openDesc=>!openDesc)}/>
        </div>
        <div className='curr-blog-heading' onClick={()=>navigate(`/blog/${user_id}/${original_user}/${props.blog_id}`)}>
          {props.blog_heading}
        </div>
        {openDesc && 
        <div className='curr-blog-sub'>
          <i>{props.blog_sub}</i>
        </div>
        }
        {props.showOptions && 
        <div className='showBlogOptions'>
          <button id='edit-blog' type='button' 
          onClick={()=>navigate(`/user/${props.blog_id}/${original_user}/${status}/addBlog`)}>Edit</button>
          <button id='delete-blog' type='button' 
          onClick={()=>deleteUserBlog(props.blog_id)}>Delete</button>
        </div>
        }
        {props.removeSave && 
        <div className='showBlogOptions'>
          <button id='remove' type='button' onClick={()=>removeSavedBlog(props.blog_id,props.blog_heading,props.blog_sub)}>Remove</button>
        </div>
        }
      </div>
    </>
    );
  }

  if(props.listOfBlogs.length===0){
    if(props.savedShow===true){
      return(
        <>
          No Saved Blogs.
        </>
      )
    }
    else{
      return(
        <>
          No Published Blogs.
        </>
      )
    }
  }

  else{
    return (
    <>
      {props.savedShow && <div className='display-blogs'>    
        {props.listOfBlogs.map((currentBlog)=>{
          return(
            <div key={currentBlog.blog_id}><DisplayBlog showOptions={props.userBlogs} blog_heading={currentBlog.heading} 
                                      blog_sub={currentBlog.sub} blog_id={currentBlog.blog_id} removeSave={props.savedShow}/></div>
          )
        })}
      </div>
      }
      {!props.savedShow && <div className='display-blogs'>    
        {props.listOfBlogs.map((currentBlog)=>{
          return(
            <div key={currentBlog._id}><DisplayBlog showOptions={props.userBlogs} blog_heading={currentBlog.heading} 
                                      blog_sub={currentBlog.sub} blog_id={currentBlog._id} removeSave={props.savedShow}/></div>
          )
        })}
      </div>
      }
    </>
    );
  }
}

export default ViewBlogs;