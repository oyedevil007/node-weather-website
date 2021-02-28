const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// Defines path for Express config
const publicDirPath = path.join(__dirname , '../public');
const viewPath = path.join(__dirname , '../template/views')
const partialsPath = path.join(__dirname , '../template/partial')

//Setup handlebar engines and views location
app.set('view engine' , 'hbs');
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('' , (req , res)=>{
    res.render('index' , {
        title : 'Weather app' , 
        name: 'Anurag Singh'
    })
})

app.get('/weather' , (req , res)=>{
    if(!req.query.location)
    {
        return res.send({
            error : 'Location Must be provided'
        })
    }
    geocode(req.query.location , (error , {latitude , longitude , location} = {})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude , longitude , (error , forecastdata)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast : forecastdata , 
                location,
                address : req.query.location
            })
        })
    })

//    res.send({
//        location : 'India' , 
//        forecast : 'It is snowing' ,
//        address : req.query.location
//    })
})

app.get('/products' , (req , res)=>{

    if(!req.query.search){
        return res.send({
            error : 'You must search :/'
        })
    }

    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help' , (req , res)=>{
    res.render('help' , {
        title:'Help Page' , 
        name : 'Anurag'
    })
})

app.get('/about' , (req,res)=>{
    res.render('about' , {
        name : 'Anurag' , 
        title : 'About'
    })
})

app.get('/help/*' , (req , res)=>{
    res.render('404' , {
        name : 'Anurag Singh' , 
        title : '404 Error' ,
        errorMSG : 'Help Page not found'
    })
})

app.get('*' , (req , res)=>{
       res.render('404' , {
           name : 'Anurag Singh' , 
           title : '404 Error' ,
           errorMSG : 'Page not found'
       })
})

app.listen(port , ()=>{
    console.log('Server is up on port : ' + port)
})

