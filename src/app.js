
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const publicDirectoryPath  = path.join(__dirname,"../public");
const partial_path = path.join(__dirname,"../partials");
const viewsPath  = path.join(__dirname,"../views");

app.set('view engine','hbs');
app.use(express.static(publicDirectoryPath));
app.set('views',viewsPath);
hbs.registerPartials(partial_path); //changes


// app.use(express.static(path_html));

app.get('',(req,res)=>{

    res.render('index',{
        title: "Home page",
        name: "Hummed"
    });
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title: "About page",
        name: "Hummed"
    });
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title: "Help page",
        name: "Hummed"
    });
});

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.render('weather',{
        title:"Weather Report",
        message:"Error: There is no city in the parameters.",
        name:"Hummed"

        })
        
    }
  
    geocode(req.query.address, (error, {latitude, longitude, location})=>
    {
       
        if(error)
        {
            return res.send({ error });
        }


        forecast(latitude,longitude, (error, forecastData)=>{
        
           
        if(error)
        {
            return res.send({ error });
        }

          const msg = "The temperature is "+forecastData.temperature+" degrees Fahrenheit, with "+forecastData.summary+" and with a "+forecastData.rain_chance*100+"% chance of rain";
          res.render('weather',{
          title:"Weather Report",
          location: location,
          message:msg,
          name:"Hummed"
        })

        });
    })
    

});
app.get('/products',(req,res)=>{


    if(!req.query.Search)
    {
        return res.send({

            error:"You must provide a query"
        })
    }
    res.send({
        'products':[]
    })

})

app.get("*",(req,res)=>{

    res.render('error');

})
// app.use(express.static(path_html+"/help.html"));

// app.use(express.static(path_html+"/about.html"));


app.listen(3000,()=>{

    console.log("Server is up on port 3000.");
})