const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
  email:{type: String, trim: true},username:{type: String, trim: true},
  password:{type: String, trim: true},blogs:Array,saved:Array
});

const BlogSchema=new mongoose.Schema({
  heading:{type: String, trim: true},sub:{type: String, trim: true},
  content:{type: String, trim: true},username:{type: String, trim: true}
});

const ListSchema=new mongoose.Schema({
  name:String,allUsers:Array
})
const User=mongoose.model('User',UserSchema);
const Blog=mongoose.model('Blog',BlogSchema);
const List=mongoose.model('List',ListSchema);
module.exports={User,Blog,List};
