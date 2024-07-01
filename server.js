import express from "express"
import geoip from "geoip-lite" //this package is responnsible for getting the location based on the IP address
import { OpenWeatherAPI } from "openweather-api-node" //this, along with your open weather API allows you to detect the weather


const app = express()
const PORT = 3000;
app.set('trust proxy', true) //helps you get the IP if it's behind a proxy




app.get('/api/hello',(req, res) => {
       

  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress //get's the IP addess
  ip = ip.split(",")[0] // The ip address is in a string, but we need the first part of it 
  var geo = geoip.lookup(ip); //lookup the location based on the IP

  const nameOfUser = req.query.visitor_name || "Guest" 

       //this is the open weather APU we use to check the weather of the city
  let weather = new OpenWeatherAPI({
    key: "6413e35f562912c5b0596ddcb372f384",
    locationName: geo.city, //here we pass the city we get from checking the location earlier 
    units: "Imperial"
  })

       //Check the weather and send back the IP, location, name of user (if passsed to us) and the weather
    weather.getCurrent().then(data => {   
    res.json({
        "client_ip": ip,
        "location": geo.city,
        "greeting": `Hello ${nameOfUser}, the weather is ${data.weather.temp.cur}F`
    })
})

})

app.listen(PORT,"0.0.0.0",
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });

