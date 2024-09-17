const router = require("express").Router() ;
const user = require('../models/user') ;
const { authenticateToken } = require("./userAuth");

router.put('/add-to-cart',authenticateToken,async (req,res) => {
    try {
        const {bookid , id} = req.headers ;
        const userData = await user.findById(id) ;
        const isInCart = userData.cart.includes(bookid) ;

        if (isInCart) {
            return res.json({status : "Success" , message : "Book is already in cart"}) ;
        }
        await user.findByIdAndUpdate(id ,{
            $push : {cart:bookid} ,
        })

        return res.json({status : "success" , message : "Book added to cart successfully"}) ;
    } catch (error) {
        return res.status(500).json({message : "An error occured"}) ;
    }
}) ;


router.put('/remove-from-cart/:bookid',authenticateToken,async (req,res) => {
    try {
        const {bookid} = req.params ;
        const {id} = req.headers ;
        const userData = await user.findById(id) ;
        const isInCart = userData.cart.includes(bookid) ;

        if (!isInCart) {
            return res.json({status : "Success" , message : "Book is not present in cart"}) ;
        }
        await user.findByIdAndUpdate(id ,{
            $pull : {cart:bookid} ,
        })

        return res.json({status : "success" , message : "Book removed from cart successfully"}) ;
    } catch (error) {
        return res.status(500).json({message : "An error occured"}) ;
    }
}) ;


router.get('/get-cart-books',authenticateToken , async (req,res) => {
    try {
        const {id} = req.headers ;
        const userData = await user.findById(id).populate("cart") ;
        const BookCart = userData.cart.reverse() ;

        return res.json({status : " success" , data : BookCart}) ;
    
    } catch (error) {
        return res.status(500).json({message : "Internal server error"}) ;
    }
    }) ;

module.exports = router ;