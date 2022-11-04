const app = require('./app');

// const express = require('express')
// const {Router} = express

require('dotenv').config()

const PORT = process.env.PORT || 4000
app.set('port', PORT)

app.listen(app.get('port'), ()=>{
    console.log('Server READY in PORT:' +app.get('port'))
})
