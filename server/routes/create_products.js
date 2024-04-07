const express = require('express')

const router = express.Router();

const Products = require('../models/Products');

//http://localhost:5000/products/addproducts
router.post('/addproducts', async (req, res) => {
    try {
        const newProduct = new Products({
            Product_name: req.body.Product_name,
            Price: req.body.Price,
            Rating: req.body.Rating,
            Description: req.body.Description,
            Category: req.body.Category,
            Stock: req.body.Stock
        })

        const saveProduct = await newProduct.save();
        res.json(saveProduct);
    } catch (error) {
        console.error(error);
    }

})


//http://localhost:5000/products/viewproducts
router.get('/viewproducts', async (req, res) => {
    try {
        const products = await Products.find()
        res.json(products)

    } catch (error) {
        res.status(500).json({ 'Error': error })

    }
})

//http://localhost:5000/products/singleproducts/65d2f598696d498805e81971
router.get('/singleproducts/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await Products.findById(pid)
        res.json(products)
    } catch (error) {
        res.status(500).json({ 'Error': error })


    }
})


//http://localhost:5000/products/deleteproducts/65d2f5d9696d498805e81973
router.delete('/deleteproducts/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await Products.findByIdAndDelete(pid)
        res.status(200).json({ 'msg': 'User Has Delected Successfully', 'sts': '1' })
    } catch (error) {   
        res.status(500).json({ 'Error': error })
    }
})

//http://localhost:5000/products/updateproducts/65d2f598696d498805e81971
router.put('/updateproducts/:pid', async (req, res) => {
    const pid = req.params.pid
    try {
        const products = await Products.findByIdAndUpdate(
            pid,
            req.body,
            { new: true }
        )
        res.json(products)

        // res.status(200).json({ 'msg': 'User Has update Successfully' })
    } catch (error) {
        res.status(500).json({ 'Error': error })


    }
})






module.exports = router