const Product = require('../Models/Product.model');
const createError= require('http-errors');
const mongoose  = require('mongoose');


module.exports ={
    getAllProducts: async (req,res,next)=>{
   
        try{
            const results = await Product.find({},{ __v: 0});
           // const results = await Product.find({},{ name:1,price:1,available:1, _id:0 });
         // const results = await Product.find({price:6999},{});
           res.send(results)
        }catch (error) {
        console.log(error.message);
        }
            
        },createNewProduct:async(req,res,next)=>{
  
          try{
              const product = new Product(req.body)
              const result = await product.save()
              res.send(result)
          }catch (error) {
         console.log(error.message);
         if(error.name === 'ValidationError'){
             next (createError(422, error.message));
             return;
         }
         next(error);
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
        
      },
        findProductById:async(req,res,next)=> {
          const id = req.params.id;
          try{
             const product = await Product.findById(id);
             //const product = await Product.findOne({_id:id})
             if(!product){
             throw createError(404, 'Product does not exist');
             } 
             res.send(product);
          }catch (error) {
          console.log(error.message);
          if(error instanceof mongoose.CastError){
              next(createError(400, "Invalid Product id"));
              return;
          }
          next(error);
          }
          },
          UpdateProduct:async(req,res,next)=> {
  
            try{
            const id = req.params.id;
            const updates = req.body;
            const options = { new : true};
            const result = await Product.findByIdAndUpdate(id,updates,options);
            if(!result){
                throw createError(404, 'Product does not exist');
            }
            res.send(result);
          } catch (error) {
         console.log(error.message);
         if(error instanceof mongoose.CastError){
             return next (createError(400, 'Invalid product id'))
         }
         next(error);
          } 
         },
         deleteProduct:async(req,res,next)=> {
          const id= req.params.id
          try{
             const result = await Product.findByIdAndDelete(id); 
             console.log(result)
             if(!result){
              throw createError(404, 'Product does not exist');
              } 
              res.send(result)
          }catch (error) {
         console.log(error.message);
         if(error instanceof mongoose.CastError){
          next(createError(400, "Invalid Product id"));
          return;
      }
      next(error);
          } 
          res.send('deleting product')
      }

        
}