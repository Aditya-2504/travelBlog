import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom';
import UserHeader from './user_header';
import ViewBlogs from './view_blogs';
import './userpage.css'

//for pictures use cloudinary

function VisitUser(){
  const {_id,_username,_visited_user}=useParams();
  const [visit_user_blogs,setVisitUser_blogs]=useState([]);
  const [complete,setComplete]=useState(false);
  useEffect(()=>{
    fetch(`https://travelogue-explore.herokuapp.com/routes/getBlogs?userName=${_visited_user}`)
    .then(res=>res.json())
    .then(res=>{
      if(res.msg==='Successfully received'){
        setVisitUser_blogs(res.list_of_blogs);
        setComplete(true);
      }
      else{
        alert('Something went wrong. Please reload.');
      }
    });
  },[]);

  function VisitUserOptions(){
    return(
      <>
        <div className='user-options-header'>
          <div className='visit-blogs'>{_visited_user}'s Blogs</div>
        </div>
        {complete && <div className='list-of-blogs'><ViewBlogs _user_id={_id} original_user={_username} _user_name={_visited_user} listOfBlogs={visit_user_blogs}
            userBlogs={false} savedShow={false} visitorShow={true}/></div>}
      </>
    )
  }

  return (
  <>
    <div className='user'>    
      <UserHeader _user_name={_username} _id_={_id}/>
      <div className='user-options'><VisitUserOptions/></div>
    </div>
  </>);
}

export default VisitUser;