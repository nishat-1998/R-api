const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://cluster0.98xqu.mongodb.net/',
{
dbName:'Restful_api',
user:'Rest-Api',
pass:'api1234',
useNewUrlParser: true,
useNewUrlParser:true
}
).then(()=>{
    console.log("Mongodb connected..");
});

app.all('/test', (req,res) =>{
    // console.log(req.query);
    // console.log(req.query.name)
    // res.send(req.query);

    // console.log(req.params);
    // res.send(req.params);
console.log(req.body);
res.send(req.body);

});

const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);

app.use((req,res,next) => {
   
      const err = new error("Not Found 404!")
      err.status =404
      next(err)
});

//Error handle
app.use((err,req,res,next) =>{
res.status(err.status || 500)
res.send({
    error:{
        status: err.status ||500,
        message: err.message
    }
})
});

app.listen(3000,() => {
    console.log('server started on port 3000..')
});