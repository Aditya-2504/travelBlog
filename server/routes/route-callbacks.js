const {User,Blog,List}=require('../Models/user');

//login 
const singleUser=async (req,res)=>{
  try{
    const {userName,password}=req.query;
    const currentUser=await User.findOne({username:userName,password:password});
    if(!currentUser) 
      return res.json({msg:'user not found'});
    res.json({...currentUser,msg:'successful login',urlid:currentUser._id.toString()});
    }
  catch(error){
    res.status(404).json({msg:error});
  }   
}

//register new user
const registerUser= async(req,res)=>{
  try{
    const tempUser=req.body;
    const findUser=await User.findOne({username:tempUser.username});
    if(!findUser){
      const newUser=await User.create(tempUser);
      await List.updateOne({name:'ab'},{$push:{allUsers:tempUser.username}});
      res.json({msg:'Successfully registered'});
    }
    else{
      res.json({msg:'Username not available'});
    }
  }
  catch(error){
    res.status(404).json({msg:error});
  }    
}

//all users
const getallUsers=async (req,res)=>{
  try{
    const listUser=await List.findOne({name:"ab"});
    res.json({msg:'Successfully received',list_of_users:listUser.allUsers});
    }
  catch(error){
    res.status(404).json({msg:error});
  }   
}

//new blog
const newBlog= async(req,res)=>{
  try{
    const tempBlog=req.body;
    const new_blog=await Blog.create(tempBlog);
    const tempId=new_blog._id.toString();
    const {userName}=req.query;
    await User.updateOne({username:userName},{$push:{blogs:tempId}});
    res.json({msg:'Successfully added'});
  }
  catch(error){
    res.status(404).json({msg:error});
  }    
}

//update blog
const updateBlog= async(req,res)=>{
  try{
    const tempBlog=req.body;
    await Blog.updateOne({_id:tempBlog.blog_id},
      {heading:tempBlog.heading,sub:tempBlog.sub,content:tempBlog.content});
    res.json({msg:'Successfully changed'});
  }
  catch(error){
    res.status(404).json({msg:error});
  }    
}

//get blogs
const getBlogs=async (req,res)=>{
  try{
    const {userName}=req.query;
    const listBlog=await Blog.find({username:userName},{__v:0,username:0,content:0});
    res.json({msg:'Successfully received',list_of_blogs:listBlog});
    }
  catch(error){
    res.status(404).json({msg:error});
  }   
}

//get saved blogs
const getSavedBlogs=async (req,res)=>{
  try{
    const {userName}=req.query;
    const listBlog=await User.find({username:userName},{__v:0,username:0,_id:0,email:0,password:0,blogs:0});   
    res.json({msg:'Successfully received',list_of_blogs:listBlog[0].saved});
    }
  catch(error){
    res.status(404).json({msg:error});
  }   
}

//display blog
const displayBlog=async (req,res)=>{
  try{
    const {id,userName}=req.query;
    const newBlog=await Blog.findOne({_id:id});  
    if(!newBlog){
      res.json({msg:'Blog not found'});
    }
    else{
      const userSaved=await User.findOne({username:userName,'saved':{$elemMatch:{blog_id:id}}},{__v:0,username:0,_id:0,email:0,password:0,blogs:0});
      if(!userSaved){
        res.json({msg:'Successfully received',currBlog:newBlog,isSaved:false});
      }
      else{
        res.json({msg:'Successfully received',currBlog:newBlog,isSaved:true});
      }      
    }
  }
  catch(error){
    res.status(404).json({msg:error});
  }   
}

//update Saved
const updateSaved= async(req,res)=>{
  try{
    const {username,status}=req.query;
    const newTasks=req.body;
    if(status==='true'){
      await User.updateOne({username:username},{$push:{saved:newTasks}});   
    }
    else{
      await User.updateOne({username:username},{$pull:{saved:newTasks}}); 
    }
    res.json({msg:'Success'});
  }
  catch(error){
    res.status(404).json({msg:error});
  }
}

const delete_Blog=async(req,res)=>{
  try{
    const {username,id}=req.query;
    await User.updateOne({username:username},{$pull:{blogs:id}}); 
    await Blog.findOneAndDelete({_id:id});
    res.json({msg:'Successfully deleted'});
  }
  catch(error){
    res.status(404).json({msg:error});
  }
}

// deleteAccount
const deleteAccount=async(req,res)=>{
  try{
    const username=req.query.userName;
    await User.findOneAndDelete({username:username});
    await List.updateOne({name:'ab'},{$pull:{allUsers:username}});
    await Blog.deleteMany({username:username});
    res.json({msg:'Successfully deleted'});
  }
  catch(error){
    res.status(404).json({msg:error});
  }
}
// Change Password
const changePassword=async(req,res)=>{
  try{
    const username=req.query.userName;
    const newPass=req.body;
    await User.findOneAndUpdate({username:username},{password:newPass.pass},{new:true});
    res.json({msg:'Successfully changed password'});
  }
  catch(error){
    res.status(404).json({msg:error});
  }
}

module.exports={singleUser,registerUser,deleteAccount,changePassword,getallUsers,newBlog,getBlogs,getSavedBlogs,
                displayBlog,updateSaved,delete_Blog,updateBlog};