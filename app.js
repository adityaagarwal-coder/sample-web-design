const http = require('http');
const fs = require('fs');
const bodyParser = require("body-parser");
const Joi = require('joi');
const db = require("./mongo");
const collection = "todo";
const path=require('path');
const express=require("express");
const app=express();
const hostname='127.0.0.1'
const port=80;
app.use('/static',express.static('static'));
app.use(express.urlencoded())
app.set('view engine','pug');
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, './'));
app.get("/",(req,res)=>{
    const home = fs.readFile('./index.html',null,function(error, data){
        if(error){
            res.status(404);
        }
        else
        {
            res.write(data);
        }
        res.send();
    });
});
app.get("/signin",(req,res)=>{
    const home = fs.readFile('./sign-in_page.html',null,function(error, data){
        if(error){
            res.status(404);
        }
        else
        {
            res.write(data);
        }
        res.send();
    });
});
app.get("/accollection",(req,res)=>{
    var data = require('./products.json');
    var obj = JSON.parse(JSON.stringify(data));
    var newEventList = obj.products.map(products => ({
        name: products.name ,
        image: products.image ,
        price: products.price ,
     }));
    res.status(200).render('accollection.pug',newEventList);
});
app.listen(port,hostname,()=>{
    console.log(`Application successfully started on port http://${hostname}:${port}/`);
})
db.connect((err)=>{
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    else{
        app.listen(3000,()=>{
            console.log('connected to database, app listening on port 3000');
        });
    }
});