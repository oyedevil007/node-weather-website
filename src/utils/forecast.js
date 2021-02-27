const request = require('request');

const forecast = (lat , long , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f68845c51aa6c24157cddafaf6b463bb&query=' + lat + ',' + long ;
    request({url , json : true} , (error , {body})=>{
        if(error){
            callback('unable to access weather app' , undefined)
        }else if(body.error)
        {
            callback(body.error , undefined);
        }else{
            callback(undefined ,body.current.weather_descriptions[0] + ', Temperature : ' + body.current.temperature   );
        }
    })
}

module.exports = forecast;