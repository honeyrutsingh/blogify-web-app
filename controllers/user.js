const User=require('../models/user');

async function handleUserSignup(req,res){
    const {fullName,email,password}=req.body;

    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/user/login');
}

async function handleUserLogin(req,res){
    const{email,password}=req.body;
    try {
        const token=await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect('/'); 
        
    } catch (error) {
        res.render("login",{
            error:'Incorrect Email or Password'
        })
    }
}

function handleLogout(req,res){
    return res.clearCookie('token').redirect('/');
}

module.exports={
    handleUserSignup,
    handleUserLogin,
    handleLogout
}