import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//GENERATE TOKEN 
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
}


export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        //IF USER ALREADY EXITS OF NOT

        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: "User already exits"});
        }

        if(password.length < 8){
            return res.status(400).json({success: false, message: "Password must be at least 8 characters"})
        }

        //HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt)

        //CREATE A USER
        const user = await User.create({
            name, 
            email,
            password: hashedpassword
        })
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

//LOGIN FUNCTION 

export const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(500).json({message: "Invalid email or Password"})
        }

        //COMPARING PASSWORD
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).json({message: "Invalid email or Password"})
        }

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    catch{
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

//GET USER PROFILE FUNCTION

export const getUserProfile = async (req, res) => {
    try {
        const user = await user.findById(req.user.id).select(".password")
        if(!user){
            return  res.status(404).json({message: "User not found"})
        }
        res.json(user)
    }catch{
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}