require("dotenv").config();
const path=require("path");
const express=require("express");
const{connectToMongoose}=require("./connection");
const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog')
const cookieParser=require("cookie-parser");
const{checkForAuthenticationCookie}=require("./middlewares/authentication");

const Blog=require('./models/blog');

const app=express();

//connection
connectToMongoose(process.env.MongoURL).
then(()=>console.log("MongoDB connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static('./public'))

//routes
app.get('/',async (req,res)=>{
    const allBlogs= await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    });
});
app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server running at PORT ${process.env.PORT}`);
});