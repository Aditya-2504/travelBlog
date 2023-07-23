import React,{useState,useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import Picture_1 from './images/register slideshow/picture 1.jpg';
import Picture_2 from './images/register slideshow/picture 2.jpg';
import Picture_3 from './images/register slideshow/picture 3.jpg';
import './registerpage.css'
function RegisterPage(){
  const navigate=useNavigate();
  const url=[Picture_1,Picture_2,Picture_3];
  function SlideShow(){
    const [index,setIndex]=useState(0);
    useEffect(()=>{
      setInterval(()=>{
        setIndex(index=>(index+1)%4)
      },4000);
    },[]);
    if(index===0){
      return(
        <p id='register-header-text'><br/><br/>Embrace your inner travel buff<br/><br/><br/>
        Share your travel stories</p>
      );
    }
    return(
    <>
      <img className='register-slideshow-images' src={url[index-1]}/>
    </>
    );
  }

  function RegisterForm(){
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const handleRegister=(e)=>{
      e.preventDefault();
      if(!email){
        alert("Email is required");
      }
      else if(!username){
        alert("Username is required");
      }
      else if(!password){
        alert("Password is required");        
      }
      else{
        fetch('https://travelogue-explore.herokuapp.com/routes/registerUser',{
          method:"POST",
          body:JSON.stringify({
            email:email, username:username, password:password,blogs:[],saved:[]
          }),
          headers: {
            "Content-type":"application/json",
            "charset":"UTF-8"
          }
        })
        .then(res=>res.json())
        .then(res=>{
          alert(res.msg);
          if(res.msg==='Successfully registered'){
            navigate("/");
          }
        });
      }
      setEmail('');
      setUsername('');
      setPassword('');
    }
    return(
      <form className='register-form'>
        <label htmlFor='register_email'>E-mail Id: </label>
        <input id='register_email' type='text' name='newEmail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='register_user'>Username: </label>
        <input id='register_user' type='text' name='newUserName' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <br/>
        <label htmlFor='register_pass'> Password: </label>
        <input id='register_pass' type='password' name='newPassWord' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <button className='register_button' type='button' onClick={handleRegister}>Register</button>
      </form>
    );
  }

  return (
  <>
    <div className='register'> 
      <div className='register-header'>
        <SlideShow/>
      </div>
      <div className='register-heading'>
        Sign up for your journey around the globe  
      </div>
      <RegisterForm/>
    </div>
  </>);
}

export default RegisterPage;