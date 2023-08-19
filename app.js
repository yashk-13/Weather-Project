const { time } = require("console");
const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");
require('dotenv').config();



const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get("/",function(req,res){

    res.sendFile(__dirname +"/public/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;    
    const apiKey = process.env.apiKey;

    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units=metric'
    
    https.get(url,function (response){
            console.log(response.statusCode);
        
            response.on('data',function(data){
                    const weatherData =JSON.parse(data);
                    const Temp = weatherData.main.temp
                    res.send("todays temperature in "+ query +" is " + Temp + " *C" );
            
            
                })
            
            });
                 
        });
app.listen(3000,function(){
    console.log('server is running');
})