const router = require("express").Router() ;
const user = require('../models/user') ;
const jwbtoken = require('jsonwebtoken') ;
const { authenticateToken } = require("./userAuth");
const book = require('../models/book')

router.post("/add-book",authenticateToken , async (req,res) => {
    try {
        const {id} = req.headers ;
        const getuser = await user.findById(id) ;

        if(getuser.role !== "Admin")
        {
            return res.status(400).json({message : "You don't have right to access admin role"}) ;
        }

        const newBook = new book({
            url : req.body.url ,
            title : req.body.title ,
            author : req.body.author ,
            price : req.body.price ,
            desc : req.body.desc ,
            language : req.body.language
        }) ;

        await newBook.save() ;

        res.status(200).json({message : "Book added successfully"});
    } catch (error) {
        res.status(500).json({message : "Internal server error"}) ;
    }
}) ;


router.put('/update-book' , authenticateToken ,async (req,res) => {
    try {              
        const {bookid} = req.headers ;
        await book.findByIdAndUpdate(bookid , {
            url : req.body.url ,
            title : req.body.title ,
            author : req.body.author ,
            price : req.body.price ,
            desc : req.body.desc ,
            language : req.body.language
        }) ;
        return res.status(200).json({message : "Book Updated Successfully"}) ;
    } catch (error) {
        res.status(500).json({message: "Invalid Server Error"}); 
    }
}) ;


router.delete('/delete-book' , authenticateToken ,async (req,res) => {
    try {              
        const {bookid} = req.headers ;
        await book.findByIdAndDelete(bookid) ;
        return res.status(200).json({message : "Book Deleted Successfully"}) ;
    } catch (error) {
        res.status(500).json({message: "Invalid Server Error"}); 
    }
}) ;


router.get('/get-all-book' ,async (req,res) => {
    try {              
        const books = await book.find().sort({createdAt:-1}) ;
        return res.json({status:"Success" , data:books}) ;
    } catch (error) {
        res.status(500).json({message: "Invalid Server Error"}); 
    }
}) ;


router.get('/get-recent-book' ,async (req,res) => {
    try {              
        const books = await book.find().sort({createdAt:-1}).limit(4) ;
        return res.json({status:"Success" , data:books}) ;
    } catch (error) {
        res.status(500).json({message: "Invalid Server Error"}); 
    }
}) ;


router.get('/get-book-by-id/:id' ,async (req,res) => {
    try {  
        const {id} = req.params ;            
        const books = await book.findById(id) ;
        return res.json({status:"Success" , data:books}) ;
    } catch (error) {
        res.status(500).json({message: "Invalid Server Error"}); 
    }
}) ;

module.exports = router ;