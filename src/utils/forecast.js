const request = require('request');


const forecast = (latitude,longitude,callback)=>
{
    const url = "https://api.darksky.net/forecast/f157ef84a77c7e835099616133851509/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude);

request({url : url, json: true }, (error, {body})=>{

        if(error)
        {
                callback("There is an error. No internet conenctivity ", undefined);
        }
        else if(body.error)
        {
                callback(body.error,undefined);
        }
        else
        {
                callback(undefined,{

                    temperature : body.currently.temperature,
                    summary : body.currently.summary,
                    rain_chance : body.currently.precipProbability,
                    
                });
                
        }  

})

}

module.exports = forecast;
