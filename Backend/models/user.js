const mongoose = require('mongoose') ;
const validator = require('validator');

const user = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true ,
        min : [4 , 'Username length should be greater than 4'] ,
        trim : true
    } ,
    email : {
        type : String ,
        required : true ,
        trim : true ,
        validate: {
            validator: validator.isEmail,
            message: "Invalid Email"
        }
    } ,
    password : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true ,
        min : [5 , 'Password length should be greater than 5'] 
    } ,
    address : {
        type : String ,
        required : true ,
    } ,
    avatar : {
        type : String ,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s"
    } ,
    role : {
        type : String ,
        default : "User" ,
        enum : ["User" , "Admin"]
    } ,
    favourites :[{
        type : mongoose.Types.ObjectId ,
        ref : "book"
    },
    ] , 
    cart : [{
        type : mongoose.Types.ObjectId ,
        ref : "book"
    },
    ] ,
    orders : [{
        type : mongoose.Types.ObjectId ,
        ref : "order"
    },
    ]
} ,
    {timestamps : true}
) ;

module.exports = mongoose.model("user",user) ;