const express = require('express')
require('dotenv').config()
const app = express();

const _ = require('lodash');

const Producto = require('./src/services/productos.services')

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/health', (_req,res)=>{
    res.status(200).json({
        success:true,
        enviroment : process.env.enviroment,
        health:'up'
    })
})



app.get('/',(_req,res)=>{
    const products = new Producto;
     res.render('pages/index',{products: products.getProducto()})
     
})

// app.get('/next',(_req,res)=>{
    
// })


app.post('/productos', (req,res)=>{
    const {name,lastname,age} = req.body;

    const products = new Producto();
    products.postProduct({
        name,
        lastname,
        age
    })

    res.redirect('/')
})

module.exports=app;