'use strict';
const express = require('express');

const cors = require('cors');

const axios = require('axios');

require('dotenv').config();

const server = express();

server.use(cors());

server.use(express.json());
const mongoose=require('mongoose');

const PORT=process.env.PORT;

//mongoose 
let frouitModle;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGOOSE_URL);
}

const frouitShema=new mongoose.Schema({
    name: String,
    image:String,
    price:Number,
    ownerEmail:String,
  });

  const fruitModale= mongoose.model('frouits', frouitShema);



//Routes 
server.get('/getFruits',getFruitsFun);
server.post('/addFav',addFavFruits);
server.get('/getFavFruits',getFavFruitsFun);



//http://localhost:3010/getFruits
//Handelers
function getFruitsFun(req,res){
    axios
    .get('https://fruit-api-301.herokuapp.com/getFruit')
    .then(result=>{
        console.log(result.data.fruits);
        res.send(result.data.fruits)
    })
    .catch(err=>{res.send(err)})
}

async function addFavFruits (req,res){
const {name,image,price,ownerEmail}=req.body;
await fruitModale.create({
 name:name,
 image:image,
price:price,
ownerEmail:ownerEmail
});
fruitModale.find({ownerEmail:ownerEmail},(err,result)=>{
    if(err){
        console.log(err);
    }else{
        res.send(result);
    }
})
}

function getFavFruitsFun(req,res){
    const email=req.query.ownerEmail;
    fruitModale.find({ownerEmail:ownerEmail}),(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }

}
