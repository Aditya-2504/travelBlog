const express=require('express');
const tasks=require('./routes/tasks');
const app=express();
const connectDb=require('./connect');
const cors=require('cors');
app.use(cors());
app.use(express.json());
require('dotenv').config();
app.use('/',tasks);
const PORT=process.env.PORT||5000;
const start=async ()=>{
    try{
        await connectDb(process.env.MONGO_URL);
        app.listen(PORT,console.log(`Server is listening on port ${PORT}`));
    }
    catch(error){
        console.log(error);
    }
}
start()
