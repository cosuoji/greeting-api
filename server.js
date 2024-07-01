import express from "express"
import userip from "ip"
import geoip from "geoip-lite"

const app = express()
const PORT = 3000;
app.set('trust proxy', true)


app.get('/api',(req, res) => {
       

  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 

  console.log(ip)
  var geo = geoip.lookup(ip);
  console.log(geo)


        res.json({
            "client_ip": ip,
            "location":  geo,
            "greeting": `Hello ${req.query.visitor_name}`

        });
    });
 
app.listen(PORT,"0.0.0.0",
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });

