import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import './deleteacc.css'

function DeleteAcc(props){
  const navigate=useNavigate();
  function deleteAccount(){
    fetch(`https://travelogue-explore.herokuapp.com/routes/deleteUser?userName=${props.userName}`,{
      method:"DELETE"
    })
    .then(res=>res.json())
    .then(res=>{
      navigate('/');
    });
  }
  if(props.delacc===true){
    return(
    <div className="delete">
      <div className="delete-content">
        <div className="modal-header">
          <div className="modal-title"><strong>Delete account</strong></div>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this account? 
        </div>
        <div className="modal-footer">
          <button style={{cursor:"pointer"}} className="acc-delete" onClick={deleteAccount}>Delete</button>          
          <button style={{cursor:"pointer"}} className="delete-cancel" onClick={props.onClose}>Cancel</button>
        </div>
      </div>
    </div>
    )
  }
  else{
    const [newpass,setNewpass]=useState('');
    const [confirmpass,setConfirmpass]=useState('');
    function changePassword(){
      if(newpass.length==0){
        alert('Enter a valid password');
        setNewpass('');
        setConfirmpass('');
        return;
      }
      if(newpass===confirmpass){
        fetch(`https://travelogue-explore.herokuapp.com/routes/changePassword?userName=${props.userName}`,{
          method:"PATCH",
          body:JSON.stringify({
            pass:newpass
          }),
          headers: {
            "Content-type":"application/json",
            "charset":"UTF-8"
          }
        })
        .then(res=>res.json())
        .then(res=>{
          alert(res.msg);
        });
        props.onClose();
      }
      else{
        alert('New password and confirm password do not match');
        setNewpass('');
        setConfirmpass('');
      }
    }
    return(
    <div className="delete">
      <div className="delete-content-pass">
        <div className="modal-header">
          <div className="modal-title"><strong>Change Password</strong></div>
        </div>
        <div className="modal-body">
          <label htmlFor="new_pass">New Password: </label><br/>
          <input id="new_pass" type='password' name="New Password" value={newpass} onChange={(e)=>setNewpass(e.target.value)}/>  
          <br/><br/>
          <label htmlFor="confirm_pass">Confirm Password: </label><br/>         
          <input id="confirm_pass" type='password' name="Confirm Password" value={confirmpass} onChange={(e)=>setConfirmpass(e.target.value)}/> 
        </div>
        <div className="modal-footer">
          <button style={{cursor:"pointer"}} className="acc-delete" onClick={changePassword}>Confirm</button>          
          <button style={{cursor:"pointer"}} className="delete-cancel" onClick={props.onClose}>Cancel</button>
        </div>
      </div>
    </div>
    )
  }
  
}

export default DeleteAcc