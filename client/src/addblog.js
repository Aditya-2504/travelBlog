import React,{useState,useEffect,useRef} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import './addblog.css'

//for pictures use cloudinary

function AddBlog(){
  const navigate=useNavigate();
  const {_id,_username,status}=useParams();
  const [complete,setComplete]=useState(false);
  const curr_blog=useRef({});
  useEffect(()=>{
    if(status==='true'){
      setComplete(true);
      return;
    }
    console.log('Hello');
    fetch(`https://travelogue-explore.herokuapp.com/routes/displayBlog?id=${_id}&userName=${_username}`)
    .then(res=>res.json())
    .then(res=>{
      if(res.msg==='Successfully received'){
        curr_blog.current=res.currBlog;
        setComplete(true);
      }
      else{
        alert('The page does not exist.');
        setTimeout(navigate(-1),5000);
      }
    });
  },[]);
  const blog_text=useRef('');
  const blog_heading=useRef('');
  const blog_sub=useRef('');

  function handleEdit(){
    if(blog_heading.current.trim()===''){
      alert('Blog must have a title');
      return;
    }
    if(blog_text.current.trim()===''){
      alert('Blog must have some content');
      return;
    }
    fetch(`https://travelogue-explore.herokuapp.com/routes/addBlog?userName=${_username}`,{
      method:"PUT",
      body:JSON.stringify({
        heading:blog_heading.current, sub:blog_sub.current, content:blog_text.current,blog_id:_id
      }),
      headers: {
        "Content-type":"application/json",
        "charset":"UTF-8"
      }
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.msg==='Successfully changed'){
          navigate(-1);
        }
        alert(res.msg);
    });
  }

  function handlePublish(){
    if(blog_heading.current.trim()===''){
      alert('Blog must have a title');
      return;
    }
    if(blog_text.current.trim()===''){
      alert('Blog must have some content');
      return;
    }
    fetch(`https://travelogue-explore.herokuapp.com/routes/addBlog?userName=${_username}`,{
      method:"POST",
      body:JSON.stringify({
        heading:blog_heading.current, sub:blog_sub.current, content:blog_text.current,username:_username
      }),
      headers: {
        "Content-type":"application/json",
        "charset":"UTF-8"
      }
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.msg==='Successfully added'){
          navigate(`/user/${_id}/${_username}`);
        }
        alert(res.msg);
    });
  }

  function Heading(){
    const [newHeading,setNewHeading]=useState('');
    blog_heading.current=newHeading;
    useEffect(()=>{
      if(status==='true'){
        return;
      }
      setNewHeading(curr_blog.current.heading);
    },[]);
    return(
      <>
        <input id='blog-heading-input' type='text' placeholder='Enter the title' value={newHeading} 
         onChange={(e)=>setNewHeading(e.target.value)}/>
      </>
    )
  }

  function SubHeading(){
    const [newSubHeading,setNewSubHeading]=useState('');
    blog_sub.current=newSubHeading;
    useEffect(()=>{
      if(status==='true'){
        return;
      }
      setNewSubHeading(curr_blog.current.sub);
    },[]);
    return(
      <>
        <input id='blog-subheading-input' type='text' placeholder='Enter a sub-title' value={newSubHeading} 
         onChange={(e)=>setNewSubHeading(e.target.value)}/>
      </>
    )
  }

  function Content(){
    const [newContent,setNewContent]=useState('');
    blog_text.current=newContent;
    useEffect(()=>{
      if(status==='true'){
        return;
      }
      setNewContent(curr_blog.current.content);
    },[]);
    return(
      <>
        <textarea rows='10' id='blog-content' placeholder='Type here' value={newContent} 
         onChange={(e)=>setNewContent(e.target.value)}/>
      </>
    )
  }

  // function Image(){
  //   const [uploadImage,setUploadImage]=useState([]);
  //   console.log(uploadImage);
  //   return(
  //     <>
  //       <div className='blog-images'>
  //         <input id='input-image' name='image-upload' type='file' accept="image/*,.jpg,.png"
  //         onChange={(e)=>setUploadImage(uploadImage=>[...uploadImage,e.target.value])}/>
  //         <div className='upload-image'>Upload Images</div>
  //         <div className='remove-image'>Remove Images</div>
  //       </div>
  //     </>
  //   )
  // }

  return (
  <>
    {complete && 
    <div className='new-blog'>  
      <div className='blog-options'>
        {status==='true' && <button type='button' name='Publish' id='publish' onClick={()=>handlePublish()}>Publish</button>}
        {status==='false' && <button type='button' name='Save Changes' id='publish' onClick={()=>handleEdit()}>Save</button>}
        <button type='button' name='Cancel' id='cancel' onClick={()=>navigate(`/user/${_id}/${_username}`)}>Cancel</button>      
      </div>  
      <div className='blog-heading'>
        <Heading/><br/>
        <SubHeading/>
        <p className='author'><i>by {_username}</i></p>
        {/* <Image/>
        <br/> */}
        <Content/>
      </div>        
    </div>}
  </>);
}

export default AddBlog;