import React,{useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom';
import menu_icon from './images/menu icon.jpg';
import DeleteAcc from './deleteacc';
import './userpage.css'

//for pictures use cloudinary

function UserHeader(props){
  const navigate=useNavigate();
  const [names,setNames]=useState([]);
  useEffect(()=>{
    fetch('https://travelogue-explore.herokuapp.com/routes/allUsers')
    .then(res=>res.json())
    .then(res=>{
      if(res.msg==='Successfully received'){
        setNames(res.list_of_users);
      }
      else{
        alert('Server down');
        navigate('/');
      }
    })
  },[]);
  
  var searchNames=names.filter(tempName=>tempName!==props._user_name);
  function Menu(){
    const [deleteacc,setDeleteacc]=useState(false);
    const [pass_change,setPass_change]=useState(false);
    return(
    <>
      <div className='user-menu'>
        <div className='userName'>{props._user_name}</div>
        <div className='pass_change' onClick={()=>setPass_change(true)}>Change Password</div>
        <div className='del_acc' onClick={()=>setDeleteacc(true)}>Delete Account</div>
        <div className='logout' onClick={()=>navigate('/')}>Logout</div>
        {deleteacc && <DeleteAcc userName={props._user_name} onClose={()=>setDeleteacc(false)} delacc={true} change_pass={false}/>}
        {pass_change && <DeleteAcc userName={props._user_name} onClose={()=>setPass_change(false) } delacc={false} change_pass={true}/>}
      </div>
    </>
    )
  }

  function UserMenu(){
    const [open,setOpen]=useState(false);
    return(
    <>
      <img className='user-menu-image' src={menu_icon} onClick={()=>setOpen(open=>!open)}/>
      {open && <Menu/>}
    </>
    );
  }

  function Search(){
    const [searchValue,setSearchValue]=useState('');
    function ChangeNames(){
      const len=searchValue.length;
      const newNames=searchNames.filter(searchName=>searchName.length>=len && searchValue===searchName.substring(0,len));
      searchNames=newNames;
      if(searchNames.length==0){
        return(
          <div className='searchbox'>
            <div id='user-searchbox'>No user found</div>
          </div>
        )
      }
      return(
        <div className='searchbox'>
          {searchNames.map((searchName)=>{
            return(
              <div key={searchName} id='user-searchbox' onClick={()=>navigate(`/user/${props._id_}/${props._user_name}/${searchName}`)}>{searchName}</div>
            )
          })}
        </div>
      )
    }
    function changeSearchValue(e){
      if(e.target.value.length<searchValue.length){
        searchNames=names.filter(tempName=>tempName!==props._user_name);
      }
      setSearchValue(e.target.value);
    }
    return(
      <>
        <input id='user-search' type='text' placeholder='Search' value={searchValue} onChange={(e)=>changeSearchValue(e)}/>
        {searchValue.length>0 && <ChangeNames/>}
      </>
    );
  }

  return (
  <>
    <div className='user-header'> 
      <p id='user-header-heading' onClick={()=>navigate(`/user/${props._id_}/${props._user_name}`)}>
        Travelogue
      </p>
      <Search/>
      <UserMenu/>
    </div>
  </>);
}

export default UserHeader;