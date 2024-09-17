const router = require("express").Router() ;
const { authenticateToken } = require("./userAuth");
const Order = require('../models/order') ;
const book = require('../models/book') ;
const user = require('../models/user') ;

router.post('/place-order' , authenticateToken , async (req,res) => {
    try {
        const {id} = req.headers ;
        const {order} = req.body ;

        for(const orderData of order)
        {
            const newOrder = new Order({user:id , book : orderData._id}) ;
            const orderDataFromDb = await newOrder.save() ;

            await user.findByIdAndUpdate(id , {
                $push : {orders : orderDataFromDb._id}
            }) ;

            await user.findByIdAndUpdate(id , {
                $pull : {cart : orderData._id} ,
            }) ;

            return res.json({status : "Success" , message : "Order Places Successfully"}) ;
        }
    } catch (error) {
        return res.status(500).json({message : "Internal server error"}) ;
    }
}) ;


router.get('/get-order-history' , authenticateToken , async (req,res) => {
    try {
        const {id} = req.headers ;

        const userData = await user.findById(id).populate({
            path : "orders" ,
            populate : {path:"book"} 
        }) ;

        const orderData = userData.orders.reverse() ;

            return res.json({status : "Success" , data : orderData}) ;
    } catch (error) {
        return res.status(500).json({message : "Internal server error"}) ;
    }
}) ;


router.get('/get-all-orders' , authenticateToken , async (req,res) => {
    try {
        const userData = await Order.find().populate({
            path : "book"
        }).populate({
            path : "user" 
        }).sort({createdAt : -1}) ;

        return res.json({status : "Success" , data : userData}) ;
    } catch (error) {
        return res.status(500).json({message : "Internal server error"}) ;
    }
}) ;


router.put('/update-order/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updateOrder = await Order.findByIdAndUpdate(id, { status: req.body.status }, { new: true });

        if (!updateOrder) {
            return res.status(404).json({ status: "Failed", message: "Order not found" });
        }

        return res.json({ status: "Success", message: "Data updated successfully", data: updateOrder });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router ;