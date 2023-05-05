const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler");
const User = require('../model/userModel')

// desc Register new user 
// route POST /api/users
// access Public
const registerUser = asyncHandler( async(req, res) => {
    const { name, email, password} = req.body;
    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Please fulfill all fields')
    }

    //  Check if user exists
    const existUser = await User.findOne({email});
    if(existUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    //  Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ("Invalid user data")
    }

});

// desc Authenticate a user 
// route POST /api/users/login
// access Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    //  Check for user email
    const user = await User.findOne({email})
    if (user && ( await bcrypt.compare( password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ("Invalid credentials")
    }
});

// desc Get user data 
// route GET /api/users/me
// access Private
const getMe = asyncHandler( async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email
    })
    res.json({message: "User data display"})
});

// Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWt_SECRET, { expiresIn: '1d'})

}
module.exports = {registerUser, loginUser, getMe}