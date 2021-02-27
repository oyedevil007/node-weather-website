const request = require('request');

const geocode = (address , callback )=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW51cmFnc2luZ2h2bnMyMDAxIiwiYSI6ImNrbDNqNnR4MzA1MHoydm13Nm55Y2dieWsifQ.oGUSs_JSs_Ae-nQy2ZO_1Q'
   request({url , json:true} , (error , {body}) =>{
       if(error){
           callback('unable to access geocoding' ,  undefined);
       }else if(body.features.length === 0){
            callback('unable to find the location' , undefined)
       }else{
           callback(undefined , {
             latitude : body.features[0].center[1] ,
             longitude : body.features[0].center[0] ,
            location : body.features[0].place_name
           })
       }
   })
}

module.exports =  geocode; 