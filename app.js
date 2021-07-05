require('dotenv').config()

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const pug=require('pug')
var bodyParser = require('body-parser')



//mongoose connection
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true});
const db=mongoose.connection;
db.on("error",(err)=>console.error(error));
db.once('open',()=>console.log('Connected to Database ...'));

//use json for api dev
app.use(express.json());

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }))

//set view engine to pug
app.set('view engine','pug')

//import collectors route
const collectorsRouter=require('./routes/collectors');
app.use('/collectors',collectorsRouter);




app.listen(3000,()=>console.log('Server started ...'));

