const express =require('express');
const router = express.Router();
const ProductController = require('../Controllers/Product.Controllers');


//get a list of all products
router.get('/', ProductController.getAllProducts);

// create a new product
router.post('/', ProductController.createNewProduct);
// Get a product by id 
router.get('/:id', ProductController.findProductById);

//update a product by id
router.patch('/:id', ProductController.UpdateProduct);
//delete a Product by id
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;