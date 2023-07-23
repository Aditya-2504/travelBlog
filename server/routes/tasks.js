const express=require('express');
const router=express.Router();
const {singleUser,registerUser,deleteAccount,changePassword,getallUsers,newBlog,
    displayBlog,getBlogs,getSavedBlogs,updateSaved,delete_Blog,updateBlog}=require('./route-callbacks');

router.route('/routes/login').get(singleUser);
router.route('/routes/allUsers').get(getallUsers);
router.route('/routes/registerUser').post(registerUser);
router.route('/routes/addBlog').post(newBlog).put(updateBlog);
router.route('/routes/displayBlog').get(displayBlog);
router.route('/routes/getSavedBlogs').get(getSavedBlogs);
router.route('/routes/getBlogs').get(getBlogs);
router.route('/routes/changeSaved').patch(updateSaved);
router.route('/routes/changePassword').patch(changePassword);
router.route('/routes/deleteBlog').delete(delete_Blog);
router.route('/routes/deleteUser').delete(deleteAccount);
router.route('/').get((req,res)=>{
    res.send("Welcome to tasks API");
});
module.exports=router;