const express = require('express')
require('dotenv').config()

const {Server: HttpServer} = require('http')
const {Server: IoServer}= require('socket.io')
const messages = [];

const app = express();

const http = new HttpServer(app);

const io = new IoServer(http);

const _ = require('lodash');

const Producto = require('./src/services/productos.services')

app.use(express.static(__dirname + '/public'));

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

io.on('connection', (socket)=>{
    console.info('Nuevo cliente conectado')
    socket.emit('UPDATE_DATA', messages);
    socket.on('NEW_MESSAGE_TO_SERVER', data => {
        
        messages.push(data)
        console.info(messages)

        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data );
    })

    
})

module.exports=app;