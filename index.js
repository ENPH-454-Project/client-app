const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const SoftSPI = require('rpi-softspi')

let client = new SoftSPI({
   clock: 15,     // pin number of SCLK
   mosi: 11,      // pin number of MOSI
   miso: 13,      // pin number of MISO
   client: 16,    // pin number of CS
})

client.open()

//Middleware
app.use(cors())
app.use(bodyParser.json())

axios.post('https://vdlmikqfqd.execute-api.us-east-1.amazonaws.com/prod/test', {
  data:[1,2,3,4,5]
  })
  .then(function(res) {
    console.log(res.data)
  })
  .catch(function(error) {
    console.log(error.response.status + ', ' + error.response.statusText)
  })


let bytes = client.read(5)
console.log(bytes)


  // Server Port
app.listen(3000,function() {
	console.log('App listening on port 3000')
})
 module.exports = app;
