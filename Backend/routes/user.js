const router = require("express").Router() ;
const user = require('../models/user') ;
const bcrypt = require('bcryptjs') ;
const jwbtoken = require('jsonwebtoken') ;
const { authenticateToken } = require("./userAuth");

router.post('/sign-up' , async (req,res) => {
    try {
        const {username , email , password , address} = req.body ;

        if(username.length < 4)
        {
            return res.status(400).json({message : "Username length should be greater than 4"}) ;
        }

        const existingUsername = await user.findOne({username : username}) ;
        if(existingUsername)
        {
            return res.status(400).json({message : "Username Exists"}) ;
        }

        if(password.length < 5)
        {
            return res.status(400).json({message : "Password length should be greater than 5"}) ;
        }

        const hashPassword = await bcrypt.hash(password , 10) ;

        const newUser = new user({
            username : username ,
            email : email ,
            password : hashPassword ,
            address : address
        }) ;

        await newUser.save() ;
        return res.status(200).json({message : "Sign Up Successful"})

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({message: messages});
        }

        res.status(500).json({message : "Internal Error"}) ;
    }
}) ;


router.post('/sign-in' , async (req,res) => {
    try {
        const {username , password} = req.body ;

        const existUser = await user.findOne({username : username}) ;
        if(!existUser)
        {
            return res.status(400).json({message: "Inavalid Credentials"});
        }

        await bcrypt.compare(password , existUser.password , (error,data) => {
            if(data)
            {
                const authClaims = [
                    {name : existUser.username} ,
                    {role : existUser.role} ,
                ] ;
                const token = jwbtoken.sign({authClaims} , "BookStore123" , {
                    expiresIn : "30d" ,
                }) ;

                return res.status(200).json({id : existUser.id , role : existUser.role , token : token});
            }
            else
            {
                return res.status(400).json({message: "Invalid Credentials"});   
            }
        }) ;

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({message: messages});
        }

        res.status(500).json({message : "Internal Error"}) ;
    }
}) ;


router.get('/get-user-information' , authenticateToken ,async (req,res) => {
    try {
        const {id} = req.headers ;
        const data = await user.findById(id).select('-password') ;
        return res.status(200).json(data) ;
    } catch (error) {
        res.status(500).json({message: "Invalid Server Error"}); 
    }
}) ;


router.put('/update-address' , authenticateToken ,async (req,res) => {
    try {
        const {id} = req.headers ;
        const {address} = req.body ;
        await user.findByIdAndUpdate(id , {address : address}) ;
        return res.status(200).json({message : "Address Updated Successfully"}) ;
    } catch (error) {
        res.status(500).json({message: "Invalid Server Error"}); 
    }
}) ;

module.exports = router ;