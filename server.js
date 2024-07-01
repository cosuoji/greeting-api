import express from "express"
import geoip from "geoip-lite"
import { OpenWeatherAPI } from "openweather-api-node"


const app = express()
const PORT = 3000;
app.set('trust proxy', true)




app.get('/api',(req, res) => {
       

  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  ip = ip.split(",")[0]
  var geo = geoip.lookup(ip);

  let weather = new OpenWeatherAPI({
    key: "6413e35f562912c5b0596ddcb372f384",
    locationName: geo.city,
    units: "Imperial"
  })

    weather.getCurrent().then(data => {
    console.log(`Current temperature in Lagos is: ${data.weather.temp.cur}F`)
    res.json({
        "client_ip": ip,
        "location": geo.city,
        "greeting": `Hello ${req.query.visitor_name}, the weather is ${data.weather.temp.cur}F`
    })
})

})
//   res.json({
//             "client_ip": ip,
//             "location":  "her",
//             "greeting": `Hello ${req.query.visitor_name}`

//         });
//     });
 
app.listen(PORT,"0.0.0.0",
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });

