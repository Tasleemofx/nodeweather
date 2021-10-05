require('dotenv').config()
const express= require('express');
const http = require('http')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
const apikey = process.env.API_KEY


app.get('/',(request, response)=>{
  response.sendFile(__dirname+"/index.html");
})
let city;
app.post('/',(request, response)=>{
   city = request.body.cityname
  const url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  http.get(url,(res)=>{
    res.on('data',(data)=>{
      var weatherinfo =JSON.parse(data);
      var icon = weatherinfo.weather[0].icon;
      var imgUrl =`http://openweathermap.org/img/wn/${icon}@2x.png`
      var weather = weatherinfo.weather[0].main;
      var temperature = Math.floor(weatherinfo.main.temp - 273);
      // response.sendFile(__dirname + "/index.html")
      response.write(`
      <h1>${city}</h1>
         <h1>${temperature}<sup>o</sup>C</h1>
         <h1>${weather} </h1>`);
      response.write("<img src=" + imgUrl+">");
      response.send();
    ;
  });
  })
})
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("started server at 3000");
})