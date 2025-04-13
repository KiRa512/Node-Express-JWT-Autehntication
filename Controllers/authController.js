const User = require('../models/user');
const jwt = require('jsonwebtoken');


const handleErrors = (err)=>{
    console.log(err.message,err.code);
    let error = { email: '', password: ''};

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            console.log(properties)
            error[properties.path] = properties.message;
        });
    }
    return error;
}

const createSignToken = (id)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '90d',
    })
    return token;
}

module.exports.signUpGet= (req,res) =>{
    res.render('signup');
}

module.exports.loginGet= (req,res) =>{
    res.render('login');

}

module.exports.signUpPost= async(req,res) =>{
    const {email , password} = req.body;
    try{
        const user = await User.create({email,password});
        const token = createSignToken(user._id);
        res.cookie('jwt',token,{
            httpOnly: true,
            maxAge: 90*24*60*60*1000
        })
        console.log(token);
        res.status(201).json({user:user._id})
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}

module.exports.loginPost= (req,res) =>{
    res.status(200).json({message: 'user login'});

}
