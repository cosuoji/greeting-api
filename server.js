import express from "express"
import bodyParser from "body-parser"
//import ip from "ip"
import geoip from "geoip-lite"

const app = express()
const PORT = 3000;



app.get('/api',
        async (req, res) => {
       
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var geo = geoip.lookup(ip);
  console.log(geo)

  console.log(geo)
        res.json({
            "client_ip": ip,
            "location":  "Yeah",
            "greeting": `Hello ${req.query.visitor_name}`

        });
    });
 
app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });