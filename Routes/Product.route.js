const express =require('express');
const router = express.Router();


const Product = require('../Models/Product.model')

router.get('/',(req,res,next)=>{
    next(new Error(" can not get a list"))
   // res.send('getting a list of all products..');
    
});


router.post('/',(req,res,next)=>{
    console.log(req.body);
    const product = new Product({
        name:req.body.name,
        price:req.body.price,
        available:req.body.available
    })

    product.save()
    .then(result =>{
        console.log(result);
        res.send(result)
    })
    .catch(err =>{
        console.log(err.message);
    })
  
});

router.get('/:id',(req,res,next)=> {
res.send("single product")
})
router.patch('/:id',(req,res,next)=> {
    res.send('updating product')
})
router.delete('/:id',(req,res,next)=> {
    res.send('deleting product')
})

module.exports = router;