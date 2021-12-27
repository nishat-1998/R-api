const express =require('express');
const router = express.Router();


const Product = require('../Models/Product.model');


//get a list of all products
router.get('/',async (req,res,next)=>{
   
try{
    const results = await Product.find({},{ __v: 0});
   // const results = await Product.find({},{ name:1,price:1,available:1, _id:0 });
 // const results = await Product.find({price:6999},{});
   res.send(results)
}catch (error) {
console.log(error.message);
}
    
});

// create a new product
router.post('/',async(req,res,next)=>{
  
    try{
        const product = new Product(req.body)
        const result = await product.save()
        res.send(result)
    }catch (error) {
   console.log(error.message);
    }


  
    //  console.log(req.body);
    //const product = new Product({
    //     name:req.body.name,
    //     price:req.body.price,
    //     available:req.body.available
    // });

    // product.save()
    // .then(result =>{
    //     console.log(result);
    //     res.send(result)
    // })
    // .catch(err =>{
    //     console.log(err.message);
    // })
  
});
// Get a product by id 
router.get('/:id',async(req,res,next)=> {
const id = req.params.id;
try{
   // const product = await Product.findById(id);
   const product = await Product.findOne({_id:id})
    res.send(product);
}catch (error) {
console.log(error.message);
}
});

//update a product by id
router.patch('/:id',(req,res,next)=> {
    res.send('updating product')
})

router.delete('/:id', async(req,res,next)=> {
    const id= req.params.id
    try{
       const result = await Product.findByIdAndDelete(id); 
       console.log(result)
        res.send(result)
    }catch (error) {
   console.log(error.message);
    } 
    res.send('deleting product')
})

module.exports = router;