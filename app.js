const express = require('express');
const createError =require('http-errors');
const dotenv =require('dotenv').config();



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Initialize DB
require('./initDb')();

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
   
    //  const err = new error("Not Found 404!")
//err.status =404
//next(err)
next(createError(404, 'Not Found'));
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
const PORT =process.env.PORT ||3000;


app.listen(PORT,() => {
    console.log('server started on port '+ PORT +'...');
});