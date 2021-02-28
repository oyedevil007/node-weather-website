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
         //   console.log(body.current);
            callback(undefined ,body.current.weather_descriptions[0] + ', The Temperature is: ' + body.current.temperature + "°C" + ' , The wind speed is ' + body.current.wind_speed + ' and humidity is ' + body.current.humidity + "\n" + '. Is it day -> ' + body.current.is_day  );
        }
    })
}

module.exports = forecast;