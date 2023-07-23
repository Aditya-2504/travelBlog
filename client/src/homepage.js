import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Picture_1 from './images/Slideshow/picture 1.jpg';
import Picture_2 from './images/Slideshow/picture 2.jpg';
import Picture_3 from './images/Slideshow/picture 3.jpg';
import Picture_4 from './images/Slideshow/picture 4.jpg';
import Picture_5 from './images/Slideshow/picture 5.jpg';
import './homepage.css'
function HomePage(){
  const navigate=useNavigate();
  const url=[Picture_1,Picture_2,Picture_3,Picture_4,Picture_5];
  function SlideShow(){
    const [index,setIndex]=useState(0);
    useEffect(()=>{
      setInterval(()=>{
        setIndex(index=>(index+1)%5)
      },4000);
    },[]);
    return(
    <>
      <img className='slideshow-images' src={url[index]}/>
      <br/>
      <img className='next-image' src={url[(index+1)%5]} onClick={()=>setIndex(index=>(index+1)%5)}/>
      <img className='next-image' src={url[(index+2)%5]} onClick={()=>setIndex(index=>(index+2)%5)}/>
      <img className='next-image' src={url[(index+3)%5]} onClick={()=>setIndex(index=>(index+3)%5)}/>
      <img className='next-image' src={url[(index+4)%5]} onClick={()=>setIndex(index=>(index+4)%5)}/>
    </>
    );
  }

  function LoginForm(){
    const [userName,setUserName]=useState('');
    const [passWord,setpassWord] =useState('');
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(!userName){
        alert("Username is required");
        setUserName('');
        setpassWord('');
      }
      else if(!passWord){
        alert("Password is required");
        setUserName('');
        setpassWord('');
      }
      else{
        fetch(`https://travelogue-explore.herokuapp.com/routes/login?userName=${userName}&password=${passWord}`)
        .then(res=>res.json())
        .then(res=>{
          if(res.msg==='successful login'){
            const _url=res.urlid;
            navigate(`/user/${_url}/${userName}`);
          }
          else if(res.msg==='user not found'){
            alert('Incorrect username or password');
            setUserName('');
            setpassWord('');
          }
        });
      }
    }
    return(
      <>
        <form className='login-form'>
          <p>Enter details to sign in your account</p>
          <label htmlFor='field_user'>Username: </label>
          <input id='field_user' type='text' name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          <br/>
          <label htmlFor='field_pass'> Password: </label>
          <input id='field_pass' type='password' name='passWord' value={passWord} onChange={(e)=>setpassWord(e.target.value)}/>
          <br/>
          <button className='login_button' type='button' onClick={handleSubmit}>Login</button>
          {<p>Don't have an account? 
            <Link to="/register" style={{color:'white'}}>Click here to Register</Link>
          </p> }
        </form>
      </>
    )
  }
  return (
  <>
    <div className='home'> 
      <div className='header'>
        <p id='header-text'>Explore the world with us</p>
      </div>
      <div className='places-slideshow'>
        <div >
           <SlideShow/>       
        </div>
      </div>
      <div className='login'>
        <LoginForm/>
      </div>
    </div>
  </>);
}

export default HomePage;