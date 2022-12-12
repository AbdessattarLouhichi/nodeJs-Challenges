const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let secret = process.env.SECRET_KEY;
// Register user
exports.register = async (req,res)=>{
    try {
        const {email,password} = req.body
           
        // Check if user exists
        const userExist = await User.findOne({email : email})
       
        if (userExist){
            res.status(400).json({message : 'Email is already  used'})
        }

        // crypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // save user 
        const newUser = await User.create(req.body);
        console.log(password , hashedPassword)
        res.status(201).json(newUser)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
}

// login user
exports.login = async (req,res)=>{
    try {
       const {email, password} = req.body;

       // find user
        const user = await User.findOne({email : email})
       
        if(!user){
           return res.status(400).json({message : "user does not exist"})
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if(!passMatch){return res.status(400).json({message : "check your email or your password!"})};
        // create token
       
        const token = jwt.sign({name : user.name},secret, {expiresIn : '1h'});


        return res.status(200).json({user : user, token : token});

    } catch (error) {
        res.status(500).json({message :error.message})
    }
}

// verify Token
exports.verifyToken =  (req, res, next) =>{
    try {
        if(!req.headers['authorization']) return next({message : 'no authorization'})
        console.log(req.headers['authorization'])
        const authHeader =  req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        
        jwt.verify(token, secret, (err, payload)=>{
            if (err){return res.json({message: err.message})}
            req.payload = payload
               
            });
        
        
       
    } catch (error) {
        res.sendStatus(500).json({message :error.message})
    }
    next(); 
}
    
