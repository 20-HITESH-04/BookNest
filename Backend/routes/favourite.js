const router = require("express").Router() ;
const user = require('../models/user') ;
const { authenticateToken } = require("./userAuth");

router.put('/add-book-to-favourite',authenticateToken , async (req,res) => {
try {
    const {bookid , id} = req.headers ;
    const userData = await user.findById(id) ;
    const isBookFavourite = userData.favourites.includes(bookid) ;

    if(isBookFavourite)
    {
        return res.status(200).json({message: "Book is already in favourite"}) ;
    }
    await user.findByIdAndUpdate(id,{$push : {favourites : bookid}}) ;
    res.status(200).json({message: "Book added to favourite"}) ;

} catch (error) {
    res.status(500).json({message : "Internal server error"}) ;
}
}) ;


router.put('/remove-book-from-favourite',authenticateToken , async (req,res) => {
    try {
        const {bookid , id} = req.headers ;
        const userData = await user.findById(id) ;
        const isBookFavourite = userData.favourites.includes(bookid) ;
    
        if(isBookFavourite)
        {
            await user.findByIdAndUpdate(id,{$pull : {favourites : bookid}}) ;
            return res.status(200).json({message: "Book removed from favourite"}) ;
        }

        return res.send(200).json({message : "book is not present in favourite"}) ;
    
    } catch (error) {
        res.status(500).json({message : "Internal server error"}) ;
    }
    }) ;


router.get('/get-favourite-books',authenticateToken , async (req,res) => {
        try {
            const {id} = req.headers ;
            const userData = await user.findById(id).populate("favourites") ;
            const BookFavourite = userData.favourites ;
    
            return res.json({status : " success" , data : BookFavourite}) ;
        
        } catch (error) {
            return res.status(500).json({message : "Internal server error"}) ;
        }
        }) ;

module.exports = router ;